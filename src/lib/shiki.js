import { BUNDLED_LANGUAGES, getHighlighter } from 'shiki';

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
        const start = parseInt(range[0], 10);
        const end = parseInt(range[1], 10);
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      } else {
        result.push(parseInt(item, 10));
      }
      return result;
    }, []);
  }

  return highlightLines;
};

const getOptions = (highlightLines, language, theme) => {
  if (highlightLines.length > 0) {
    return {
      language,
      theme,
      lineOptions: highlightLines.map((line) => ({
        line,
        classes: ['highlighted-line'],
      })),
    };
  }

  return {
    language,
    theme,
  };
};

const getLanguage = (lang) => {
  // go through the list of supported languages and check if the language is supported
  const supportedLanguage = BUNDLED_LANGUAGES.find(
    (language) =>
      // Languages are specified by their id, they can also have aliases (i. e. "js" and "javascript")
      language.id === lang || language.aliases?.includes(lang)
  );

  // If the language is not supported, fallback to bash
  if (!supportedLanguage) {
    return 'bash';
  }

  return supportedLanguage?.id || lang;
};

export default async function highlight(code, lang = 'bash', meta = '', theme = 'css-variables') {
  if (!code) {
    return Promise.resolve('');
  }

  let language = await getLanguage(lang);

  if (!highlighter) {
    highlighter = await getHighlighter({ langs: [language], theme });
  }

  // Check for the loaded languages, and load the language if it's not loaded yet.
  if (!highlighter?.getLoadedLanguages().includes(language)) {
    // Check if the language is supported by Shiki
    const bundles = BUNDLED_LANGUAGES.filter(
      (bundle) =>
        // Languages are specified by their id, they can also have aliases (i. e. "js" and "javascript")
        bundle.id === language || bundle.aliases?.includes(language)
    );
    if (bundles.length > 0) {
      await highlighter?.loadLanguage(language);
    } else {
      // If the language is not supported, fallback to bash
      language = 'bash';
    }
  }

  const highlightLines = parseHighlightLines(meta);

  const html = await highlighter?.codeToHtml(code, {
    ...getOptions(highlightLines, language, theme),
  });

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
