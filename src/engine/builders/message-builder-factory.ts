import { Tag } from '../../messaging/fields/base/tag';
import { BeginningOfStringField } from '../../messaging/fields/beginning-of-string/beginning-of-string';
import { BodyLengthField } from '../../messaging/fields/body-length/body-length';
import { MessageTypeField, MESSAGE_TYPE } from '../../messaging/fields/message-type/message-type';
import { AdvertisementMessageBuilder } from './advertisement';
import { AllocationMessageBuilder } from './allocation';
import { AllocationAcknowledgementMessageBuilder } from './allocation-ack';
import { IBaseMessageBuilder } from './base-message-builder';
import { EmailMessageBuilder } from './email';
import { ExecutionReportMessageBuilder } from './execution-report';
import { HeartbeatMessageBuilder } from './heartbeat';
import { IndicationOfInterestMessageBuilder } from './indication-of-interest';
import { ListCancelRequestMessageBuilder } from './list-cancel-request';
import { ListExecuteMessageBuilder } from './list-execute';
import { ListStatusMessageBuilder } from './list-status';
import { ListStatusRequestMessageBuilder } from './list-status-request';
import { LogonMessageBuilder } from './logon';
import { LogoutMessageBuilder } from './logout';
import { NewOrderListMessageBuilder } from './new-order-list';
import { NewOrderSingleMessageBuilder } from './new-order-single';
import { NewsMessageBuilder } from './news';
import { OrderCancelRejectMessageBuilder } from './order-cancel-reject';
import { OrderCancelReplaceRequestMessageBuilder } from './order-cancel-replace-request';
import { OrderCancelRequestMessageBuilder } from './order-cancel-request';
import { OrderStatusRequestMessageBuilder } from './order-status-request';
import { RejectMessageBuilder } from './reject';
import { ResendRequestMessageBuilder } from './resend-request';
import { SequenceResetMessageBuilder } from './sequence-reset';
import { TestRequestMessageBuilder } from './test-request';

/**
 * This class provides a central, static repository for all message builder types.  This reduces overhead of
 * creating and destroying (and garbage-collecting) many builders (often of the same type).  Once initialized, the
 * class caches instances of each builder.
 *
 * It is assumed that the user understands how to work with a given builder (usually just interacting via the
 * interface to the abstract base class BaseMessageBuilder).  If a builder is not properly prepared for a new
 * incoming message, the user may experience problems.  However, this factory handles none of this builder
 * management, it simply acts as a cache provider.
 */
export abstract class MessageBuilderFactory {

    private static _isInitialized: boolean                            = false;
    private static _builders: { [name: string]: IBaseMessageBuilder } = null;

    // To save a small bit of time, initialize all builders once then pull from the cache when needed.
    public static initialize() {

        if (this._isInitialized) return;

        this._builders = {};

        this._builders[MESSAGE_TYPE.advertisement]                = new AdvertisementMessageBuilder();
        this._builders[MESSAGE_TYPE.allocation]                   = new AllocationMessageBuilder();
        this._builders[MESSAGE_TYPE.allocation_ack]               = new AllocationAcknowledgementMessageBuilder();
        this._builders[MESSAGE_TYPE.email]                        = new EmailMessageBuilder();
        this._builders[MESSAGE_TYPE.execution_report]             = new ExecutionReportMessageBuilder();
        this._builders[MESSAGE_TYPE.heartbeat]                    = new HeartbeatMessageBuilder();
        this._builders[MESSAGE_TYPE.indication_of_interest]       = new IndicationOfInterestMessageBuilder();
        this._builders[MESSAGE_TYPE.list_cancel_request]          = new ListCancelRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.list_execute]                 = new ListExecuteMessageBuilder();
        this._builders[MESSAGE_TYPE.list_status]                  = new ListStatusMessageBuilder();
        this._builders[MESSAGE_TYPE.list_status_request]          = new ListStatusRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.logon]                        = new LogonMessageBuilder();
        this._builders[MESSAGE_TYPE.logout]                       = new LogoutMessageBuilder();
        this._builders[MESSAGE_TYPE.news]                         = new NewsMessageBuilder();
        this._builders[MESSAGE_TYPE.order_cancel_reject]          = new OrderCancelRejectMessageBuilder();
        this._builders[MESSAGE_TYPE.order_cancel_replace_request] = new OrderCancelReplaceRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.order_cancel_request]         = new OrderCancelRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.order_list]                   = new NewOrderListMessageBuilder();
        this._builders[MESSAGE_TYPE.order_single]                 = new NewOrderSingleMessageBuilder();
        this._builders[MESSAGE_TYPE.order_status_request]         = new OrderStatusRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.reject]                       = new RejectMessageBuilder();
        this._builders[MESSAGE_TYPE.resend_request]               = new ResendRequestMessageBuilder();
        this._builders[MESSAGE_TYPE.sequence_reset]               = new SequenceResetMessageBuilder();
        this._builders[MESSAGE_TYPE.test_request]                 = new TestRequestMessageBuilder();

        this._isInitialized = true;
    }

    public static getBuilder(tokens: string[]): IBaseMessageBuilder {

        if (!this._isInitialized) throw new Error();

        //tslint:disable:no-magic-numbers
        const beginningOfStringToken = tokens[0];
        const bodyLengthToken        = tokens[1];
        const messageTypeToken       = tokens[2];
        //tslint:enable:no-magic-numbers

        let [tag, raw] = beginningOfStringToken.split('=');
        if (!raw || Number(tag) !== Tag.BeginString) return null;
        const beginningOfStringField = new BeginningOfStringField(raw);

        [tag, raw] = bodyLengthToken.split('=');
        if (!raw || Number(tag) !== Tag.BodyLength) return null;
        const bodyLengthField = new BodyLengthField(raw);

        [tag, raw] = messageTypeToken.split('=');
        if (!raw || Number(tag) !== Tag.MsgType) return null;
        const messageTypeField = new MessageTypeField(raw);

        const builder = this._builders[messageTypeField.formatted];
        builder.reset(beginningOfStringField, bodyLengthField, messageTypeField);

        return builder;
    }
}
