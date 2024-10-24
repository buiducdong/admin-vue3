const SYSTEM_NAME = "vi-mash";

/** The key used when caching data */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`;
  static readonly REFRESH_TOKEN = `${SYSTEM_NAME}-refresh-token-key`;
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`;
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`;
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`;
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`;
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`;
  static readonly USER_NAME = `${SYSTEM_NAME}-username-key`;
  static readonly ROLES = `${SYSTEM_NAME}-role-key`;
}

export default CacheKey;
