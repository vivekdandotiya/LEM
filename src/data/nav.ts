export interface NavItem {
  title: string;
  href: string;
  exact?: boolean;
  hasDropdown?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { title: "Services", href: "/services", hasDropdown: true },
  { title: "Case Study", href: "/how-it-works" },
  { title: "Pricing", href: "/services" },
  { title: "Blog", href: "/blog" },
  { title: "About Us", href: "/about" },
];
