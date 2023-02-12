import "dotenv/config";
import { syncTypes } from "../../../shared/syncTypes.js";
import { getDateFormated } from "../../utils/dateTime.js";
import { stateTypes } from "../../../shared/stateTypes.js";
import { findFieldIndex } from "../../utils/findFieldIndex.js";
import { showLog } from "../../utils/memory.js";
import { createNewDriver } from "./create.js";
import { updateDrivers } from "./update.js";
import { refreshStatusDriver } from "./status.js";
import { getLastSync, updateLog } from "../logs.controller.js";
import { tableTypes } from "../../../shared/tableTypes.js";
import { getSankhyaData } from "../api.data.js";

export async function SankhyaServiceDriver(syncType) {
  const syncTable = tableTypes.motoristas;

  const { lastSync, logId } = await getLastSync(syncType, syncTable);

  const getData = async () => {
    try {
      console.log(syncType, "get drivers data");

      const { fields, data } = await getSankhyaData(
        syncTable,
        syncType,
        lastSync
      );

      if (!data) return;

      let dataParsed = data.map((item) => {
        return {
          nome_mot: item[findFieldIndex("NOMEPARC", fields)],
          cpf_mot: item[findFieldIndex("CGC_CPF", fields)],
          cnh_mot: item[findFieldIndex("CNH", fields)],
          status: item[findFieldIndex("STATUS", fields)],
          dt_criacao: getDateFormated(item[findFieldIndex("DTCAD", fields)]),
          dt_atualizacao: getDateFormated(
            item[findFieldIndex("DATAFLEX", fields)]
          ),
        };
      });

      if (syncType == syncTypes.created) {
        await createNewDriver(dataParsed);
      } else {
        await updateDrivers(dataParsed);
      }

      await refreshStatusDriver(dataParsed);

      dataParsed = null;

      showLog(dataParsed?.length);

      await updateLog(logId, stateTypes.success);
    } catch (error) {
      console.log(`Error on getData :`, error);
    }
  };

  await getData(0);
}