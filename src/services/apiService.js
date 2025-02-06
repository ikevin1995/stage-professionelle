import axios from "axios";

// Définition dynamique de l'URL de base (utile pour développement & production)
const API_BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:8000/courseapp";

// Configuration d'Axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000, // Timeout pour éviter les requêtes trop longues (10s)
});

// Gestion globale des erreurs (optionnel mais recommandé)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erreur API :", error.response ? .data || error.message);
        return Promise.reject(error);
    }
);

// Service pour les appels API liés aux enseignants
export const TeacherService = {
    /**
     * Récupérer la liste des enseignants
     * @returns {Promise} Liste des enseignants
     */
    async getTeachers() {
        try {
            const response = await apiClient.get("/register/teacher/");
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des enseignants :", error);
            throw error;
        }
    },

    /**
     * Supprimer un enseignant par ID
     * @param {number} teacherId - ID de l'enseignant à supprimer
     * @returns {Promise} Réponse de l'API
     */
    async deleteTeacher(teacherId) {
        try {
            const response = await apiClient.delete(`/register/teacher/${teacherId}/`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'enseignant ID ${teacherId} :`, error);
            throw error;
        }
    },
};