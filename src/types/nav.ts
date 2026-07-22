export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  subcategories?: Subcategory[];
}

export interface NavbarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export interface DesktopNavbarProps {
  categories: Category[];
  isLoading: boolean;
}

export interface MobileNavbarProps {
  categories: Category[];
  onClose?: () => void;
}
