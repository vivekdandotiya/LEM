export interface NavItem {
  title: string;
  href: string;
  exact?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
