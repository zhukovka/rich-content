const { groupBy } = require('lodash');
const version = '6.6.6';
module.exports = function(Handlebars) {
  Handlebars.registerHelper('merge-list', function(context, options) {
    if (!context || context.length === 0) {
      return '';
    }

    const list = context.filter(merge => {
      if (options.hash.message) {
        const pattern = new RegExp(options.hash.message, 'm');
        if (!pattern.test(merge.commit.message)) {
          return false;
        }
        merge.packages = `- ${merge.message.split(' ')[0]}`;
        merge.message = merge.commit.message;
        merge.id = `\t - [#${merge.id}]`;
        merge.href = `(${merge.href})`;
        return true;
      }
      return false;
    });

    if (!list || list.length === 0) {
      return '';
    }

    const merges = list.reduce((acc, item) => {
      const messages = item.message.split('\n');
      const pattern = new RegExp(options.hash.message, 'm');
      if (!messages) {
        acc.push([item.packages, item.id + item.href + ' ' + item.message]);
      } else {
        messages.map(message => {
          const splittedMessage = message.split(' ');
          if (pattern.test(message) && splittedMessage.length > 2) {
            acc.push([
              splittedMessage[0],
              item.id + item.href + ' ' + splittedMessage.slice(2).join(' '),
            ]);
          }
        });
      }
      return acc;
    }, []);

    const groupByPackages = groupBy(merges, item => {
      return item[0];
    });

    const result = Object.keys(groupByPackages)
      .reduce((acc, key) => {
        acc.push(key);
        Object.values(groupByPackages[key]).map(value => {
          return acc.push(value[1]);
        });
        return acc;
      }, [])
      .join('\n');

    return `${options.hash.heading}\n\n${result}`;
  });

  Handlebars.registerHelper('check-release-version', function(context) {
    if (!context) {
      return false;
    }
    if (context === 'Unreleased') {
      return true;
    }
    try {
      const currVersion = parseFloat(context.substring(1));
      const fromVersion = parseFloat(version);
      const isSupportedVersion =
        fromVersion < currVersion ||
        (fromVersion <= currVersion && context.length >= 5 && context[5] >= version[4]);
      if (isSupportedVersion) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  });
};
