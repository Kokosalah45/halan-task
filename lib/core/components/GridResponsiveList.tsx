import { CSSProperties } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  FooterComponent?: React.ReactNode;
  itemContainerStyle?: CSSProperties;
  listContainerStyle?: CSSProperties;
};

// TODO: TRY TO MAKE IT VIRUTALIZED
const GridResponsiveList = <T,>({
  items,
  renderItem,
  keyExtractor,
  itemContainerStyle,
  listContainerStyle,
  FooterComponent,
}: ListProps<T>) => {
  return (
    <div
      style={{
        ...listContainerStyle,
      }}
    >
      <ul
        className="p-3 "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {items.map((item) => {
          return (
            <li
              style={{
                ...itemContainerStyle,
              }}
              key={keyExtractor(item)}
            >
              {renderItem(item)}
            </li>
          );
        })}
      </ul>
      {FooterComponent}
    </div>
  );
};

export default GridResponsiveList;
