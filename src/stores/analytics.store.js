import { defineStore } from "pinia";
import { getAnalytics } from "@/api/analytics.api.js";

export const useAnalyticsStore = defineStore("analytics", {
    state: () => ({
        analytics: {},
        loading: false,
        error: null
    }),

    getters: {

    },

    actions: {
        async fetchAnalytics() {
            try {
                this.loading = true;
                this.error = null;

                this.analytics = await getAnalytics();
            } catch (err) {
                this.error = err.message || "Erreur récupération analytics";
            } finally {
                this.loading = false;
            }
        }
    }
});
