import { BUNDLED_LANGUAGES, getHighlighter, renderToHtml } from 'shiki';

let highlighter;

const parseHighlightLines = (meta) => {
  const metaArray = meta.split(' ');
  let highlightLines = [];

  if (metaArray[0].includes('{')) {
    const highlightString = metaArray[0];
    const highlightStringArray = highlightString.split('{')[1].split('}')[0].split(',');
    highlightLines = highlightStringArray.reduce((result, item) => {
      if (item.includes('-')) {
        const range = item.split('-');
        const start = parseInt(range[0]);
        const end = parseInt(range[1]);
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      } else {
        result.push(parseInt(item));
      }
      return result;
    }, []);
  }

  return highlightLines;
};

export default async function highlight(code, lang = 'bash', meta = '', theme = 'css-variables') {
  if (!code) {
    return '';
  }

  const language = lang === 'text' ? 'bash' : lang;

  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [language],
      theme,
    });
  }

  // Check for the loaded languages, and load the language if it's not loaded yet.
  if (!highlighter?.getLoadedLanguages().includes(lang)) {
    // Check if the language is supported by Shiki
    const bundles = BUNDLED_LANGUAGES.filter(
      (bundle) =>
        // Languages are specified by their id, they can also have aliases (i. e. "js" and "javascript")
        bundle.id === lang || bundle.aliases?.includes(lang)
    );
    if (bundles.length > 0) {
      await highlighter?.loadLanguage(lang);
    } else {
      // If the language is not supported, fallback to bash
      lang = 'bash';
    }
  }

  const highlightLines = parseHighlightLines(meta);

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  });

  const getOptions = (highlightLines) => {
    if (highlightLines.length > 0) {
      return {
        bg: 'transparent',
        lineOptions: highlightLines.map((line) => ({
          line,
          classes: ['highlighted-line'],
        })),
      };
    }

    return {
      bg: 'transparent',
    };
  };

  const html = renderToHtml(tokens, getOptions(highlightLines));

  return html;
}

export const getHighlightedCodeArray = async (items) => {
  let highlightedItems = [];

  try {
    highlightedItems = await Promise.all(
      items.map(async (item) => {
        const highlightedCode = await highlight(item.code, item.language);

        return highlightedCode;
      })
    );
  } catch (error) {
    console.error('Error highlighting code:', error);
  }

  return highlightedItems;
};
