Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var types_1 = require("@sentry/types");
var utils_1 = require("@sentry/utils");
var fs = require("fs");
var version_1 = require("../version");
/** Base Transport class implementation */
var BaseTransport = /** @class */ (function () {
    /** Create instance and set this.dsn */
    function BaseTransport(options) {
        this.options = options;
        /** A simple buffer holding all requests. */
        this._buffer = new utils_1.PromiseBuffer(30);
        /** Locks transport after receiving 429 response */
        this._disabledUntil = new Date(Date.now());
        this._api = new core_1.API(options.dsn);
    }
    /** Returns a build request option object used by request */
    BaseTransport.prototype._getRequestOptions = function () {
        var headers = tslib_1.__assign({}, this._api.getRequestHeaders(version_1.SDK_NAME, version_1.SDK_VERSION), this.options.headers);
        var dsn = this._api.getDsn();
        var options = {
            agent: this.client,
            headers: headers,
            hostname: dsn.host,
            method: 'POST',
            path: this._api.getStoreEndpointPath(),
            port: dsn.port,
            protocol: dsn.protocol + ":",
        };
        if (this.options.caCerts) {
            options.ca = fs.readFileSync(this.options.caCerts);
        }
        return options;
    };
    /** JSDoc */
    BaseTransport.prototype._sendWithModule = function (httpModule, event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (new Date(Date.now()) < this._disabledUntil) {
                    return [2 /*return*/, Promise.reject(new utils_1.SentryError("Transport locked till " + this._disabledUntil + " due to too many requests."))];
                }
                if (!this._buffer.isReady()) {
                    return [2 /*return*/, Promise.reject(new utils_1.SentryError('Not adding Promise due to buffer limit reached.'))];
                }
                return [2 /*return*/, this._buffer.add(new Promise(function (resolve, reject) {
                        var req = httpModule.request(_this._getRequestOptions(), function (res) {
                            var statusCode = res.statusCode || 500;
                            var status = types_1.Status.fromHttpCode(statusCode);
                            res.setEncoding('utf8');
                            if (status === types_1.Status.Success) {
                                resolve({ status: status });
                            }
                            else {
                                if (status === types_1.Status.RateLimit) {
                                    var now = Date.now();
                                    var header = res.headers ? res.headers['Retry-After'] : '';
                                    header = Array.isArray(header) ? header[0] : header;
                                    _this._disabledUntil = new Date(now + utils_1.parseRetryAfterHeader(now, header));
                                    utils_1.logger.warn("Too many requests, backing off till: " + _this._disabledUntil);
                                }
                                var rejectionMessage = "HTTP Error (" + statusCode + ")";
                                if (res.headers && res.headers['x-sentry-error']) {
                                    rejectionMessage += ": " + res.headers['x-sentry-error'];
                                }
                                reject(new utils_1.SentryError(rejectionMessage));
                            }
                            // Force the socket to drain
                            res.on('data', function () {
                                // Drain
                            });
                            res.on('end', function () {
                                // Drain
                            });
                        });
                        req.on('error', reject);
                        req.end(JSON.stringify(event));
                    }))];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.sendEvent = function (_) {
        throw new utils_1.SentryError('Transport Class has to implement `sendEvent` method.');
    };
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.close = function (timeout) {
        return this._buffer.drain(timeout);
    };
    return BaseTransport;
}());
exports.BaseTransport = BaseTransport;
//# sourceMappingURL=base.js.map