import { Icon } from "@chakra-ui/react";

export interface IconProps {
  color: string;
  height: number;
  width: number;
}

export const BlackSquareIcon = (props: IconProps) => {
  return (
    <Icon color={props.color} w={props.width} h={props.height}>
      <rect width={props.width} height={props.height} fill="currentColor" />
    </Icon>
  );
};
