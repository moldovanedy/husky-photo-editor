import { State } from "../GlobalSpecialState";
import { store } from "../redux/global.store";
import { createMessage, MessageType } from "../redux/messages.redux";
import { db } from "./db";

/**
 * Adds or modifies data from the "misc" table in the db. If the key already exist, the value will be overwritten. If the key does not exist, a new record will be created
 * @param key The key that identifies the value
 * @param value The actual value that gets stored in the db
 * @returns A Promise that resolves with a boolean indicating that the operation was successful or not
 */
export async function addOrModifyMiscDataDB(
    key: string,
    value: any
): Promise<boolean> {
    let i18n = State.getObject("translationContext");
    function resolve() {
        return true;
    }

    function reject() {
        return false;
    }

    try {
        let success = false;
        await db.misc.get(key).then((data) => {
            if (data === undefined) {
                return db.misc
                    .add({ key: key, value: value })
                    .then(resolve, reject);
            } else {
                return db.misc.update(key, value).then(resolve, reject);
            }
        });

        return success;
    } catch {
        store.dispatch(
            createMessage({
                message: i18n("messages:errors.unknownDbError"),
                type: MessageType.Error
            })
        );
        return false;
    }
}
