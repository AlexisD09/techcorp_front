import { defineStore } from "pinia";
import {getTools, getToolById, getRecentTools, updateToolStatus} from "@/api/tools.api.js";

export const useToolsStore = defineStore("tools", {
    state: () => ({
        tools: [],
        selectedTool: null,
        page: 1,
        limit: 10,
        loading: false,
        error: null,
        sortKey: null,
        sortOrder: 'desc',
        search: '',
        filters: {
            department: '',
            status: '',
            category: '',
            minCost: 0,
            maxCost: 4000,
        }
    }),

    getters: {
        sortedTools: (state) => {
            if (!state.sortKey) return state.filteredTools;

            return [...state.filteredTools].sort((a, b) => {
                const valA = a[state.sortKey];
                const valB = b[state.sortKey];

                if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        },
        filteredTools: (state) => {
            return state.tools.filter(tool => {
                const matchSearch = Object.values(tool)
                    .filter(v => v !== null && v !== undefined)
                    .map(v => String(v).toLowerCase())
                    .join(' ')
                    .includes(state.search.toLowerCase());

                const matchDepartment =
                    state.filters.department
                        ? tool.owner_department === state.filters.department
                        : true;

                const matchStatus =
                    state.filters.status
                        ? tool.status === state.filters.status
                        : true;

                const matchCost =
                    tool.monthly_cost >= state.filters.minCost &&
                    tool.monthly_cost <= state.filters.maxCost;

                return matchSearch && matchDepartment && matchStatus && matchCost;
            });
        },
        paginatedTools: (state) => {
            const start = (state.page - 1) * state.limit;
            const end = start + state.limit;
            return state.sortedTools.slice(start, end);
        },
        totalPages: (state) => Math.ceil(state.tools.length / state.limit),

        departments: (state) => [...new Set(state.tools.map(t => t.owner_department))],
        statuses: (state) => [...new Set(state.tools.map(t => t.status))],
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

        async fetch30DaysAgoTools() {
            try {
                this.loading = true;
                this.error = null;

                this.tools = await getRecentTools();
            } catch (err) {
                this.error = err.message || "Erreur récupération outils";
            } finally {
                this.loading = false;
            }
        },

        async toggleStatus (tool) {
            const newStatus = tool.status === "active" ? "unused" : "active";

            try {
                const updated = await updateToolStatus(tool.id, newStatus);

                tool.status = updated.status;
            } catch (err) {
                console.log("Impossible de changer le statut :", err.message);
            }
        },

        setSort(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
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

        setPage(page) {
            this.page = page;
            this.fetchTools();
        },
    }
});
