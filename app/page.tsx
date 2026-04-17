/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { redirect } from "next/navigation";

// Root page redirects to default locale
// This is necessary for static exports on GitHub Pages
// since middleware doesn't run on static hosting
export default function RootPage() {
  redirect("/en");
}
