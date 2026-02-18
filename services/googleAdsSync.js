/**
 * Google Ads Synchronization Service
 * Автоматическая синхронизация данных платформы DARY с Google Ads
 * для оптимизации рекламных кампаний и отслеживания конверсий
 */

const { google } = require('googleapis');
const config = require('../config/googleAds.config');

class GoogleAdsSyncService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
    this.adwordsApi = null;
  }

  /**
   * Инициализация соединения с Google Ads API
   */
  async initialize() {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: config.refreshToken
      });
      
      this.adwordsApi = google.adwords({
        version: 'v14',
        auth: this.oauth2Client
      });
      
      console.log('[GoogleAdsSync] Инициализация успешна');
      return true;
    } catch (error) {
      console.error('[GoogleAdsSync] Ошибка инициализации:', error);
      throw error;
    }
  }

  /**
   * Синхронизация конверсий с Google Ads
   * @param {Object} conversionData - данные о конверсии
   */
  async syncConversion(conversionData) {
    try {
      const conversion = {
        gclid: conversionData.gclid,
        conversionAction: config.conversionActionId,
        conversionDateTime: new Date().toISOString(),
        conversionValue: conversionData.value,
        currencyCode: 'EUR'
      };

      await this.adwordsApi.conversions.upload({
        customerId: config.customerId,
        requestBody: { conversions: [conversion] }
      });

      console.log('[GoogleAdsSync] Конверсия синхронизирована:', conversion);
      return { success: true, conversion };
    } catch (error) {
      console.error('[GoogleAdsSync] Ошибка синхронизации конверсии:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Автоматическое обновление аудиторий для ремаркетинга
   * @param {Array} usersList - список пользователей для аудитории
   */
  async updateRemarketingAudience(usersList) {
    try {
      const audienceMembers = usersList.map(user => ({
        hashedEmail: this.hashEmail(user.email),
        hashedPhoneNumber: user.phone ? this.hashPhone(user.phone) : null
      }));

      await this.adwordsApi.customerMatchUserLists.mutate({
        customerId: config.customerId,
        userListId: config.remarketingListId,
        requestBody: { members: audienceMembers }
      });

      console.log(`[GoogleAdsSync] Аудитория обновлена: ${usersList.length} пользователей`);
      return { success: true, count: usersList.length };
    } catch (error) {
      console.error('[GoogleAdsSync] Ошибка обновления аудитории:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Хеширование email для Customer Match
   */
  hashEmail(email) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');
  }

  /**
   * Хеширование телефона для Customer Match
   */
  hashPhone(phone) {
    const crypto = require('crypto');
    const normalized = phone.replace(/\D/g, '');
    return crypto.createHash('sha256').update(normalized).digest('hex');
  }

  /**
   * Получение статистики рекламных кампаний
   */
  async getCampaignStats(campaignId) {
    try {
      const response = await this.adwordsApi.campaigns.get({
        customerId: config.customerId,
        resourceName: `customers/${config.customerId}/campaigns/${campaignId}`
      });

      return {
        success: true,
        stats: response.data
      };
    } catch (error) {
      console.error('[GoogleAdsSync] Ошибка получения статистики:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new GoogleAdsSyncService();
