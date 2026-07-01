// Custom overrides for elements rendered inside MDX post bodies.
// next-mdx-remote picks these up via the `components` prop.
export const mdxComponents = {
  a: (props) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />
  ),
};
