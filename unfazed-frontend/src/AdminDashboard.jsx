
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/appointments";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load appointments.");
      }

      setAppointments(data.appointments || []);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  async function updateStatus(id, status) {
    setUpdatingId(id);
    setActionError("");

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status.");
      }

      setAppointments((current) =>
        current.map((appointment) =>
          appointment._id === id
            ? { ...appointment, ...(data.appointment || { status }) }
            : appointment
        )
      );
    } catch (err) {
      setActionError(err.message || "Could not update appointment.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Unfazed Admin</h1>
          <p style={styles.subtitle}>Manage appointment requests</p>
        </div>

        <div style={styles.headerActions}>
          <span style={styles.count}>
            {appointments.length} requests
          </span>

          <button
            type="button"
            style={styles.refreshButton}
            onClick={fetchAppointments}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </header>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Appointments</h2>

        {loading && <p>Loading appointments...</p>}

        {error && (
          <div>
            <p style={styles.error}>{error}</p>
            <button type="button" onClick={fetchAppointments}>
              Try again
            </button>
          </div>
        )}

        {actionError && (
          <p role="alert" style={styles.error}>
            {actionError}
          </p>
        )}

        {!loading && !error && appointments.length === 0 && (
          <p>No appointment requests yet.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.headingCell}>Patient</th>
                  <th style={styles.headingCell}>Email</th>
                  <th style={styles.headingCell}>Preferred date</th>
                  <th style={styles.headingCell}>Status</th>
                  <th style={styles.headingCell}>Message</th>
                  <th style={styles.headingCell}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => {
                  const status = (
                    appointment.status || "pending"
                  ).toLowerCase();

                  const isUpdating =
                    updatingId === appointment._id;

                  return (
                    <tr key={appointment._id}>
                      <td style={styles.cell}>
                        {appointment.patientName}
                      </td>

                      <td style={styles.cell}>
                        {appointment.patientEmail}
                      </td>

                      <td style={styles.cell}>
                        {appointment.preferredDate
                          ? new Date(
                              appointment.preferredDate
                            ).toLocaleDateString()
                          : "Not specified"}
                      </td>

                      <td style={styles.cell}>
                        <span
                          style={{
                            ...styles.status,
                            ...(status === "approved"
                              ? styles.approved
                              : status === "rejected"
                              ? styles.rejected
                              : styles.pending),
                          }}
                        >
                          {status}
                        </span>
                      </td>

                      <td style={styles.messageCell}>
                        {appointment.message || "—"}
                      </td>

                      <td style={styles.cell}>
                        <div style={styles.actions}>
                          <button
                            type="button"
                            style={{
                              ...styles.actionButton,
                              ...styles.approveButton,
                            }}
                            disabled={
                              isUpdating || status === "approved"
                            }
                            onClick={() =>
                              updateStatus(
                                appointment._id,
                                "approved"
                              )
                            }
                          >
                            {isUpdating ? "Saving..." : "Approve"}
                          </button>

                          <button
                            type="button"
                            style={{
                              ...styles.actionButton,
                              ...styles.rejectButton,
                            }}
                            disabled={
                              isUpdating || status === "rejected"
                            }
                            onClick={() =>
                              updateStatus(
                                appointment._id,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </button>

                          {status !== "pending" && (
                            <button
                              type="button"
                              style={{
                                ...styles.actionButton,
                                ...styles.pendingButton,
                              }}
                              disabled={isUpdating}
                              onClick={() =>
                                updateStatus(
                                  appointment._id,
                                  "pending"
                                )
                              }
                            >
                              Set pending
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    boxSizing: "border-box",
    minHeight: "100vh",
    width: "100%",
    padding: "clamp(16px, 3vw, 32px)",
    background: "#f7f8f5",
    color: "#193d32",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "28px",
  },
  subtitle: {
    margin: 0,
    color: "#64746b",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  count: {
    background: "#dceee4",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  refreshButton: {
    padding: "9px 14px",
    border: "1px solid #193d32",
    borderRadius: "7px",
    background: "#fff",
    color: "#193d32",
    cursor: "pointer",
  },
  card: {
    boxSizing: "border-box",
    width: "100%",
    minWidth: 0,
    background: "#fff",
    padding: "clamp(12px, 2vw, 22px)",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: "20px",
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },
  headingCell: {
    padding: "12px 10px",
    borderBottom: "2px solid #e5e9e5",
    background: "#fafbf9",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  cell: {
    padding: "12px 10px",
    borderBottom: "1px solid #e5e9e5",
    verticalAlign: "middle",
    lineHeight: 1.4,
  },
  messageCell: {
    padding: "12px 10px",
    borderBottom: "1px solid #e5e9e5",
    verticalAlign: "middle",
    lineHeight: 1.4,
    minWidth: "80px",
    maxWidth: "200px",
    overflowWrap: "anywhere",
  },
  status: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: "12px",
    textTransform: "capitalize",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },
  pending: {
    background: "#fff0cc",
    color: "#805b00",
  },
  approved: {
    background: "#dceee4",
    color: "#17633d",
  },
  rejected: {
    background: "#fde2e2",
    color: "#a32121",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    minWidth: "130px",
  },
  actionButton: {
    padding: "7px 9px",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  approveButton: {
    background: "#17633d",
    color: "#fff",
  },
  rejectButton: {
    background: "#a32121",
    color: "#fff",
  },
  pendingButton: {
    background: "#fff0cc",
    color: "#805b00",
    border: "1px solid #e3cf9b",
  },
  error: {
    color: "#b42318",
  },
};

export default AdminDashboard;