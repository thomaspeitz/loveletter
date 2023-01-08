import { styled } from "@mui/material";
import { CSSProperties } from "react";

export const Spacer = styled("span", {
  shouldForwardProp: (prop) => prop !== "size",
})<{ size?: CSSProperties["height"] }>`
  display: block;
  width: ${({ size }) => size ?? "1rem"};
  height: ${({ size }) => size ?? "1rem"};
`;
