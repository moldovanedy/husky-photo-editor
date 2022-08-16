import React, { useEffect, useState } from "react";

function StorageEstimation({ i18n }) {
    let [usedStorage, setUsedStorage] = useState(0),
        [allowedStorage, setAllowedStorage] = useState(0),
        [supportsStorageEstimation, setSupportsStorageEstimation] =
            useState(true);

    useEffect(() => {
        if (!navigator.storage) {
            setSupportsStorageEstimation(false);
            return;
        }

        try {
            navigator.storage.estimate().then((result) => {
                if (result.usage !== undefined) {
                    setUsedStorage(result.usage);
                }
                if (result.quota !== undefined) {
                    setAllowedStorage(result.quota);
                }
            });
        } catch {
            setSupportsStorageEstimation(false);
        }
    }, []);

    return (
        <>
            <h2>{i18n("common:storage")}</h2>
            {supportsStorageEstimation ? (
                <>
                    <meter
                        style={{ width: "85%", height: "40px" }}
                        low={1000 / allowedStorage} // 1 KB
                        optimum={0.4} // 40% of allowed storage
                        high={0.8} // 80% of allowed storage
                        value={
                            isNaN(usedStorage / allowedStorage)
                                ? 0.001
                                : usedStorage / allowedStorage
                        }
                    >
                        {usedStorage} / {allowedStorage}
                    </meter>
                    <p>
                        {i18n("settings:storageEstimationText", {
                            bytesUsed: usedStorage,
                            bytesAvailable: allowedStorage
                        })}
                    </p>
                </>
            ) : (
                <p>{i18n("settings:unsupportedStorageEstimation")}</p>
            )}
        </>
    );
}

export default StorageEstimation;
