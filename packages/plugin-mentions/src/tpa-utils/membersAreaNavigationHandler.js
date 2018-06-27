/* eslint-disable no-console */
export const createMembersAreaNavigationHandler = (wixSdk, santaMembersAppDefId) => mention =>
  wixSdk.getPublicAPI(
    { appDefinitionId: santaMembersAppDefId },
    api => {
      api
        .navigateToMember({
          memberId: mention.slug,
        })
        .catch(console.error);
    },
    console.error,
  );
