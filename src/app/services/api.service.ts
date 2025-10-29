import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private obtenirHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Utilisateurs
  inscrireUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs/inscrire`, utilisateur);
  }

  connecterUtilisateur(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs/connecter`, credentials);
  }

  obtenirProfilUtilisateur(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateurs/profil/${id}`, { headers: this.obtenirHeaders() });
  }

  // Projets
  listerProjets(filtres?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/projets`, { params: filtres || {} });
  }

  obtenirProjetParId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/projets/${id}`);
  }

  // Investissements
  creerInvestissement(investissement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/investissements`, investissement, { headers: this.obtenirHeaders() });
  }

  obtenirHistoriqueInvestissements(utilisateurId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/investissements/utilisateur/${utilisateurId}/historique`, { headers: this.obtenirHeaders() });
  }

  // Articles
  listerArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles`);
  }

  obtenirArticleParId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${id}`);
  }

  // Partenaires
  listerPartenaires(): Observable<any> {
    return this.http.get(`${this.apiUrl}/partenaires`);
  }
}