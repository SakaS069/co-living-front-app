import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equipmentIcon',
  standalone: true
})
export class EquipmentIconPipe implements PipeTransform {

  transform(title: string): string {
    return this.equipmentMap[title] || 'circle-help'; // fallback si non trouvé
  }

 equipmentMap: { [title: string]: string } = {
  'WiFi haut débit': '📶',
  'Climatisation': '❄️',
  'Chauffage central': '🔥',
  'Télévision écran plat': '📺',
  'Lave-vaisselle': '🧼',
  'Lave-linge': '🧺',
  'Sèche-linge': '💨',
  'Four micro-ondes': '🍲',
  'Réfrigérateur-congélateur': '🧊',
  'Cafetière': '☕',
  'Bouilloire électrique': '🍵',
  'Grille-pain': '🍞',
  'Aspirateur': '🧹',
  'Fer à repasser': '🧺',
  'Sèche-cheveux': '💇',
  'Parking privé': '🅿️',
  'Balcon': '🏢',
  'Terrasse': '🌇',
  'Jardin privatif': '🌿',
  'Piscine': '🏊',
  'Jacuzzi': '🛁',
  'Sauna': '🧖',
  'Salle de sport': '🏋️',
  'Cheminée': '🪵',
  'Piano': '🎹',
  'Console de jeux': '🎮',
  'Vélos': '🚴',
  'Kayaks': '🛶',
  'Barbecue': '🍖',
  'Lit bébé': '👶'
};


}
