"use client";
import { Faq, FaqCategory } from "@/types/home";
import React, { useState } from "react";

import FaqSearch from "./FaqSearch";
import FaqCategories from "./FaqCategories";
import FaqList from "./FaqList";
import SearchResultList from "./SearchResultList";
import FaqTitle from "./FaqTitle";
import { CircleQuestionMarkIcon } from "lucide-react";

type Props = {
  faqs: Array<Faq>;
  faq_categories: Array<FaqCategory>;
};

export default function FaqPage({ faqs, faq_categories }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [searchItems, setSearchItems] = useState<{ faqs: Array<Faq> } | null>(
    null,
  );

  const faqList = selected
    ? faqs.filter((i) => i.faq_category_id === selected)
    : faqs;

  const handleSearch = (search: string) => {
    const searchResult = faqs.filter(
      (item) => item.question.match(search) || item.answer.match(search),
    );

    setSearchItems({ faqs: searchResult });
  };

  return (
    <div className="container-home space-y-20 px-5 mt-32">
      <FaqTitle
        label="موضوع پرسش شما چیست؟"
        icon={CircleQuestionMarkIcon}
        description="موضوع مورد نظرتان را جستجو کرده یا از دسته بندی زیر انتخاب کنید"
      />
      <FaqSearch
        clearSearch={() => setSearchItems(null)}
        onSearch={handleSearch}
      />

      {searchItems && <SearchResultList items={searchItems.faqs} />}

      <FaqCategories categories={faq_categories} onSelect={setSelected} />

      <FaqTitle label="پرسش های متداول" icon={CircleQuestionMarkIcon} />

      <FaqList items={faqList} />
    </div>
  );
}
