import BaseCard from "@/lib/core/components/BaseCard";
import Clickable from "@/lib/core/components/Clickable";
import { Keyword } from "@/lib/core/entities/Keyword";
type KeywordCardProps = {
  keyword: Keyword;
  onClick: (keyword: Keyword) => void;
};
export default function KeywordCard({ onClick, keyword }: KeywordCardProps) {
  return (
    <Clickable onClick={() => onClick(keyword)}>
      <BaseCard>
        <h2 className="font-semibold capitalize text-center">{keyword.name}</h2>
      </BaseCard>
    </Clickable>
  );
}
