"use client";

import { useEffect, useState } from "react";
import BidsFilters from "@/components/bids-filters";

type Props = React.ComponentProps<typeof BidsFilters>;

export default function BidsFiltersWrapper(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <BidsFilters {...props} />;
}
