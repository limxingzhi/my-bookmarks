import { useState, useEffect } from "react";
import { auth, database } from "./data.config";
import { cloneDeep } from "lodash";
import { onValue, ref } from "firebase/database";

const useUserAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(Boolean(auth.currentUser));
  const [user, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticated(Boolean(user));
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);
  return {authenticated, user}
};

/**
 * by default, this hook will fetch all task of the current user
 */
function useReactiveRef<RawType, CleanedType>(
  referencePath: string,
  dataFormatter?: (data: RawType) => CleanedType
) {
  const [cleanedData, setCleanedData] = useState<CleanedType | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const cleanData = (data?: RawType): CleanedType | null => {
    if (!data) return null;
    if (dataFormatter) return dataFormatter(data);
    else return data as unknown as CleanedType;
  };

  const handleError = (e: any) => {
    setCleanedData(null);
    setError(e);
    setLoading(false);
  };

  useEffect(() => {
    let cleanup;
    try {
      const reference = ref(database, referencePath);
      cleanup = onValue(
        reference,
        (snapshot) => {
          const data = cleanData(
            cloneDeep<RawType>(snapshot.toJSON() as unknown as RawType)
          );
          setCleanedData(data);
          setError(null);
          setLoading(false);
        },
        handleError
      );
    } catch (e) {
      handleError(e);
    } finally {
      if (cleanup) return cleanup;
    }
  }, [referencePath]);

  return { data: cleanedData, error, loading };
}

export { useReactiveRef, useUserAuthenticated };
