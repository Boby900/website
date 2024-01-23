import clsx from 'clsx';

import highlight from 'lib/shiki';

import CodeBlockWrapper from '../code-block-wrapper';

const CodeBlock = async (props) => {
  const { className = null, copyButtonClassName = null, children, ...otherProps } = props;

  const language = children?.props?.className?.replace('language-', '');
  const meta = children?.props?.meta;
  const code = children?.props?.children?.trim();
  const html = await highlight(code, language, meta);

  return (
    <CodeBlockWrapper copyButtonClassName={copyButtonClassName}>
      <div
        className={clsx(
          '[&>pre]:my-0 [&>pre]:!bg-gray-new-98 [&>pre]:dark:!bg-gray-new-10',
          className,
          { 'code-wrap': meta?.includes('shouldWrap') }
        )}
        {...otherProps}
        data-line-numbers={meta?.includes('showLineNumbers')}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </CodeBlockWrapper>
  );
};

export default CodeBlock;
