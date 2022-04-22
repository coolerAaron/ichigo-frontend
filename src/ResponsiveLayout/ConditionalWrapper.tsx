interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: any;
  children: any;
}
export const ConditionalWraper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
  condition ? wrapper(children) : children;
