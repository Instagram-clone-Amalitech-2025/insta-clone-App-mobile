module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [], // ← keep this empty or add custom plugins as needed
    };
  };
  