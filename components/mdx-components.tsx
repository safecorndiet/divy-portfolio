export const MDXComponents = {
  h2: (props: any) => <h2 className="mt-8 text-2xl font-semibold" {...props} />, 
  pre: (props: any) => <pre className="rounded-xl p-4 overflow-x-auto bg-muted" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 pl-4 italic" {...props} />
};