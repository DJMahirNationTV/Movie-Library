import api from './axios';

// Interface für deinen Film definieren
export interface Movie {
    id?: string; //mit ? damit kein Fehler wenn leer
    title: string;
}

// GET: Alle Filme vom Backend abrufen
// weil api aufruf lange dauert, warte einen moment und blockier nicht,
// eine ein array movie wir aufgerufen
export const getAllMovies = async (): Promise<Movie[]> => {
    const response = await api.get<Movie[]>('/movies');
    return response.data;
};