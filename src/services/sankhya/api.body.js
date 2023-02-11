import { syncTypes } from "../../shared/syncTypes.js";

export const requestBodyDrivers = (syncType, lastSync) => {
  const where = lastSync
    ? syncType == syncTypes.created
      ? `AND DTCAD >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
      : `AND DATAFLEX >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
    : ` `;

  return {
    requestBody: {
      sql: `SELECT * FROM AD_VWTBCFLEXMOT WHERE CGC_CPF IS NOT NULL ${where}`,
    },
  };
};
export const requestBodyOwners = (syncType, lastSync) => {
  const where = lastSync
    ? syncType == syncTypes.created
      ? `AND DTCAD >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
      : `AND DATAFLEX >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
    : ` `;

  return {
    requestBody: {
      sql: `SELECT * FROM AD_VWTBCFLEXPROP WHERE CGC_CPF IS NOT NULL ${where}`,
    },
  };
};
export const requestBodyVehicles = (syncType, lastSync) => {
  const where = lastSync
    ? syncType == syncTypes.created
      ? `AND DHINC >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
      : `AND DATAFLEX >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
    : ` `;

  return {
    requestBody: {
      sql: `SELECT * FROM AD_VWTBCFLEXVEI WHERE PLACACAVALO IS NOT NULL ${where}`,
    },
  };
};
export const requestBodyTravels = (syncType, lastSync) => {
  const where = lastSync
    ? syncType == syncTypes.created
      ? `AND DTEMISSAO >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
      : `AND DATAFLEX >= TO_DATE('${lastSync}', 'dd/mm/yyyy HH24:MI:SS')`
    : ` `;

  return {
    requestBody: {
      sql: `SELECT * FROM AD_VWTBCFLEXCTE WHERE NUVIAGEM IS NOT NULL ${where}`,
    },
  };
};
