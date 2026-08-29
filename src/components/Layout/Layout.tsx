import { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Header from "../Header/Header";
import Sidebar, { SIDEBAR_WIDTH } from "../Sidebar/Sidebar";

/**
 * App shell: fixed header, a permanent sidebar on desktop (md+) that
 * becomes a temporary Drawer on mobile, and the routed page content.
 */
export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header onMenuClick={() => setMobileOpen(true)} />

      {/* Desktop: permanent sidebar */}
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Toolbar />
        <Sidebar />
      </Box>

      {/* Mobile: temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
        }}
      >
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
