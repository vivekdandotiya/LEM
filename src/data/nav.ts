export interface NavItem {
  title: string;
  href: string;
  exact?: boolean;
  hasDropdown?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { title: "Services", href: "/services", hasDropdown: true },
  { title: "How It Works", href: "/how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "Marketing", href: "/marketing" },
  { title: "Guides", href: "/blog" },
];
