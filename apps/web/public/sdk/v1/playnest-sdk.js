/**
 * PlayNest Game SDK (Browser CDN Bundle v1.0.0)
 * Official SDK for embedding Web Games on playnest.zone
 * Usage: <script src="https://playnest.zone/sdk/v1/playnest-sdk.js"></script>
 */
(function (global) {
  'use strict';

  var PlayNestSDK = function () {
    this.gameId = '';
    this.debug = false;
    this.initialized = false;
    this.eventListeners = {};
  };

  PlayNestSDK.prototype.init = function (config) {
    if (!config || !config.gameId) {
      console.error('[PlayNestSDK] Init error: gameId is required');
      return;
    }
    this.gameId = config.gameId;
    this.debug = !!config.debug;
    this.initialized = true;

    if (this.debug) {
      console.log('[PlayNestSDK] Initialized for gameId:', this.gameId);
    }

    // Send Handshake to Host Portal
    this._sendMessage('PLAYNEST_GAME_READY', { gameId: this.gameId, version: '1.0.0' });

    // Listen for Host Messages
    var self = this;
    window.addEventListener('message', function (event) {
      if (!event.data || typeof event.data !== 'object') return;
      var type = event.data.type;
      var payload = event.data.payload;

      if (type === 'PLAYNEST_HOST_PAUSE' && self.eventListeners['pause']) {
        self.eventListeners['pause'].forEach(function (cb) { cb(payload); });
      } else if (type === 'PLAYNEST_HOST_RESUME' && self.eventListeners['resume']) {
        self.eventListeners['resume'].forEach(function (cb) { cb(payload); });
      }
    });
  };

  PlayNestSDK.prototype.submitScore = function (data) {
    if (!this.initialized) {
      console.warn('[PlayNestSDK] Call init() before submitScore()');
      return;
    }
    this._sendMessage('PLAYNEST_SUBMIT_SCORE', {
      gameId: this.gameId,
      score: data.score,
      level: data.level || 1,
      metadata: data.metadata || {}
    });
  };

  PlayNestSDK.prototype.saveProgress = function (key, data) {
    var storageKey = 'playnest_save_' + this.gameId + '_' + key;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      this._sendMessage('PLAYNEST_SAVE_PROGRESS', { key: key, data: data });
      return true;
    } catch (e) {
      console.error('[PlayNestSDK] Save progress failed:', e);
      return false;
    }
  };

  PlayNestSDK.prototype.loadProgress = function (key) {
    var storageKey = 'playnest_save_' + this.gameId + '_' + key;
    try {
      var raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  PlayNestSDK.prototype.completeLevel = function (levelId, score) {
    this._sendMessage('PLAYNEST_LEVEL_COMPLETE', {
      gameId: this.gameId,
      levelId: levelId,
      score: score || 0
    });
  };

  PlayNestSDK.prototype.on = function (eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  };

  PlayNestSDK.prototype._sendMessage = function (type, payload) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: type, payload: payload }, '*');
    }
  };

  // Expose global instance
  global.PlayNestSDK = new PlayNestSDK();
  global.playnestSDK = global.PlayNestSDK;

})(typeof window !== 'undefined' ? window : this);
