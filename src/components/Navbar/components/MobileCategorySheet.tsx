import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, X } from "lucide-react";

import type { MobileNavbarProps } from "../../../types/nav";

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */

type Category = MobileNavbarProps["categories"][number];

interface MobileCategorySheetProps {
  categories: MobileNavbarProps["categories"];
  isOpen: boolean;
  onClose: () => void;
}

/* -------------------------------------------------------------------------- */
/*                              Style Classes                                 */
/* -------------------------------------------------------------------------- */

const sheetClass =
  "fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-2xl bg-white text-neutral-900 shadow-2xl";

const overlayClass = "fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]";

const headerClass =
  "flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 px-5";

const headerButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors active:scale-95 active:bg-neutral-100";

const categoryButtonClass =
  "flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-medium tracking-tight text-neutral-900 transition-colors active:bg-neutral-50";

const categoryLinkClass =
  "flex w-full items-center justify-between px-5 py-4 text-[15px] font-medium tracking-tight text-neutral-900 transition-colors active:bg-neutral-50";

const subcategoryLinkClass =
  "flex w-full items-center justify-between px-5 py-4 text-[15px] text-neutral-700 transition-colors active:bg-neutral-50";

/* -------------------------------------------------------------------------- */
/*                          Component                                         */
/* -------------------------------------------------------------------------- */

export default function MobileCategorySheet({
  categories,
  isOpen,
  onClose,
}: MobileCategorySheetProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  /* ------------------------------------------------------------------------ */
  /*                           Body Scroll Lock                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /* ------------------------------------------------------------------------ */
  /*                        Reset Active Category                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isOpen) {
      setActiveCategory(null);
    }
  }, [isOpen]);

  /* ------------------------------------------------------------------------ */
  /*                              Escape Key                                  */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeCategory) {
        setActiveCategory(null);
      } else {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeCategory, onClose]);

  if (!isOpen) {
    return null;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Active Category View                             */
  /* ------------------------------------------------------------------------ */

  const handleCategoryClick = (category: Category) => {
    const hasSubcategories =
      Array.isArray(category.subcategories) &&
      category.subcategories.length > 0;

    if (hasSubcategories) {
      setActiveCategory(category);
      return;
    }

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close categories"
        onClick={onClose}
        className={overlayClass}
      />

      {/* Bottom Sheet */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-category-sheet-title"
        className={sheetClass}
      >
        {/* Drag Handle */}
        <div className="flex shrink-0 justify-center pt-2.5" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-neutral-200" />
        </div>

        {/* Header */}
        <header className={headerClass}>
          {activeCategory ? (
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-label="Back to categories"
              className={headerButtonClass}
            >
              <ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
          ) : (
            <div className="w-10" aria-hidden="true" />
          )}

          <h2
            id="mobile-category-sheet-title"
            className="text-[16px] font-semibold tracking-tight"
          >
            {activeCategory?.name ?? "Categories"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close categories"
            className={headerButtonClass}
          >
            <X size={21} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </header>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          {!activeCategory ? (
            <CategoryList
              categories={categories}
              onCategoryClick={handleCategoryClick}
              onClose={onClose}
            />
          ) : (
            <SubcategoryList category={activeCategory} onClose={onClose} />
          )}
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Category List                                    */
/* -------------------------------------------------------------------------- */

interface CategoryListProps {
  categories: MobileNavbarProps["categories"];
  onCategoryClick: (category: Category) => void;
  onClose: () => void;
}

function CategoryList({
  categories,
  onCategoryClick,
  onClose,
}: CategoryListProps) {
  return (
    <nav aria-label="Shop categories">
      <div className="px-5 pb-3 pt-4">
        <p className="text-xs font-medium text-neutral-500">
          Browse all categories
        </p>
      </div>

      <ul className="divide-y divide-neutral-100">
        {categories.map((category) => {
          const hasSubcategories =
            Array.isArray(category.subcategories) &&
            category.subcategories.length > 0;

          return (
            <li key={category._id}>
              {hasSubcategories ? (
                <button
                  type="button"
                  onClick={() => onCategoryClick(category)}
                  aria-label={`Open ${category.name}`}
                  aria-haspopup="true"
                  className={categoryButtonClass}
                >
                  <span>{category.name}</span>

                  <ChevronRight
                    size={18}
                    strokeWidth={1.7}
                    className="text-neutral-400"
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <Link
                  to={`/category/${category.slug}`}
                  onClick={onClose}
                  className={categoryLinkClass}
                >
                  <span>{category.name}</span>

                  <ChevronRight
                    size={18}
                    strokeWidth={1.7}
                    className="text-neutral-300"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Subcategory List                                   */
/* -------------------------------------------------------------------------- */

interface SubcategoryListProps {
  category: Category;
  onClose: () => void;
}

function SubcategoryList({ category, onClose }: SubcategoryListProps) {
  return (
    <nav aria-label={`${category.name} categories`} className="pb-6">
      {/* View All */}
      <div className="px-5 pb-3 pt-4">
        <Link
          to={`/category/${category.slug}`}
          onClick={onClose}
          className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3.5 text-sm font-semibold text-neutral-900 transition-colors active:bg-neutral-100"
        >
          <span>View all {category.name}</span>

          <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>

      {/* Subcategories */}
      <ul className="divide-y divide-neutral-100">
        {category.subcategories?.map((subcategory) => (
          <li key={subcategory._id}>
            <Link
              to={`/category/${category.slug}/sub/${subcategory.slug}`}
              onClick={onClose}
              className={subcategoryLinkClass}
            >
              <span>{subcategory.name}</span>

              <ChevronRight
                size={17}
                strokeWidth={1.6}
                className="text-neutral-300"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
