import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#E5E3D4", color: "black" }}>
      <Navbar pageType={"landing"} role={"Admin"} />
      <Box sx={{ minHeight: "fit", paddingX: 10, paddingY: 5 }}>
        <Typography>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
          ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
          egestas semper. Aenean ultricies mi vitae est. Mauris placerat
          eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
          Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet,
          wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum
          rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in
          turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
          faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
          facilisis luctus, metus
        </Typography>
      </Box>
    </Box>
  );
}
