import { defineStore } from "pinia";
import { getTools, getToolById } from "@/api/tools.api.js";

export const useToolsStore = defineStore("tools", {
    state: () => ({
        tools: [],
        selectedTool: null,

        total: 0,
        filtered: 0,
        page: 1,
        limit: 10,

        loading: false,
        error: null
    }),

    getters: {
        paginatedTools: (state) => {
            const start = (state.page - 1) * state.limit;
            const end = start + state.limit;
            return state.tools.slice(start, end);
        },
        hasFilters: (state) => {
            return state.filters && Object.values(state.filters).some(v => v !== "");
        }
    },

    actions: {
        async fetchTools() {
            try {
                this.loading = true;
                this.error = null;

                this.tools = await getTools();
            } catch (err) {
                this.error = err.message || "Erreur récupération outils";
            } finally {
                this.loading = false;
            }
        },

        async fetchToolById(id) {
            try {
                this.loading = true;
                this.selectedTool = await getToolById(id);
            } catch (err) {
                this.error = err.message || "Erreur récupération outil";
            } finally {
                this.loading = false;
            }
        },

        setFilter(key, value) {
            this.filters[key] = value;
            this.page = 1;
            this.fetchTools();
        },

        resetFilters() {
            this.filters = {
                name: "",
                department: "",
                status: "",
                category: ""
            };
            this.page = 1;
            this.fetchTools();
        },

        setPage(page) {
            this.page = page;
            this.fetchTools();
        },

        setLimit(limit) {
            this.limit = limit;
            this.page = 1;
            this.fetchTools();
        }
    }
});
