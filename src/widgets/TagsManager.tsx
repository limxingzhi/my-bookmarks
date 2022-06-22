import { Chip } from "@mui/material";
import { css } from "@emotion/css";

const tagManagerStyles = {
  wrap: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 8,
  }),
};

interface TagManagerProps {
  tags: Array<string>;
  onClick?: (tag: string) => void;
  icon?: JSX.Element;
  readonly?: boolean;
}

export default function TagManager({
  tags,
  onClick,
  icon,
}: TagManagerProps) {
  return (
    <div className={tagManagerStyles.wrap}>
      {tags.map((label) => {
        const clickProps = onClick
          ? {
              onClick: () => onClick(label),
            }
          : {};
        return (
          <Chip
            {...clickProps}
            variant="outlined"
            icon={icon}
            size="small"
            key={label}
            label={label}
          />
        );
      })}
    </div>
  );
}
