import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceIcon',
  standalone: true
})
export class ServiceIconPipe implements PipeTransform {

  transform(title: string): string {
    return this.emojiMap[title] || 'circle-help'; // fallback si non trouvé
  }

emojiMap: { [title: string]: string } = {
  'Ménage inclus': '🧹',
  'Linge de maison fourni': '🛏️',
  'Accueil personnalisé': '🤝',
  'Conciergerie 24h/24': '🎧',
  'Petit-déjeuner livré': '🥐',
  'Courses livrées': '🛍️',
  'Navette aéroport': '🚌',
  'Location de voiture': '🚗',
  'Guide touristique': '🗺️',
  'Réservation restaurants': '🍽️',
  'Billetterie spectacles': '🎫',
  'Massages à domicile': '💆',
  'Chef à domicile': '👨‍🍳',
  'Baby-sitting': '👶',
  'Promenade d\'animaux': '🐾',
  'Laverie express': '🧺',
  'Maintenance technique': '🛠️',
  'Check-in tardif': '⏰',
  'Stockage bagages': '💼',
  'WiFi professionnel': '📶'
};


}
