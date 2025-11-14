const STEP_1_DETAILS = {
	name: 'Se procurer un arbre',
	subSteps: [
		{
			name: 'Choisir la bonne espèce',
			faqs: [
				{
					question: 'Comment choisir la bonne espèce ?',
					response:
						"Privilégiez les espèces locales adaptées au climat et au sol. Elles favorisent la biodiversité et s'enracinent plus facilement."
				},
				{
					question: 'Que signifie espèce endémique ?',
					response:
						'Une espèce endémique pousse naturellement dans la région et contribue à préserver le patrimoine naturel local.'
				}
			]
		},
		{
			name: 'Obtenir son arbre',
			faqs: [
				{
					question: 'Où puis-je obtenir mon arbre ?',
					response:
						'Vous pouvez vous rendre dans une pépinière locale ou participer à des actions de reboisement communautaire.'
				},
				{
					question: "Comment préparer l'arbre avant la plantation ?",
					response:
						'Vérifiez que la motte est intacte et que les racines ne sont pas desséchées ou abîmées.'
				}
			]
		},
		{
			name: 'Préparer le terrain',
			faqs: [
				{
					question: 'Quel type de sol est idéal ?',
					response:
						'Une terre meuble, aérée et légèrement humide, débarrassée de cailloux et de racines anciennes, est idéale.'
				}
			]
		}
	]
};

const STEP_2_DETAILS = {
	name: "Planter l'arbre",
	subSteps: [
		{
			name: 'Creuser le trou',
			faqs: [
				{
					question: 'Quelle profondeur creuser ?',
					response:
						"Le trou doit être deux fois plus large que la motte pour que l'arbre puisse bien s'enraciner."
				},
				{
					question: 'Comment nourrir la terre ?',
					response:
						"Ajoutez du compost ou du fumier naturel pour renforcer les racines et la santé de l'arbre."
				}
			]
		},
		{
			name: 'Planter au bon moment',
			faqs: [
				{
					question: 'Quand planter ?',
					response:
						'La meilleure période est généralement le début de la saison des pluies pour assurer un bon arrosage naturel.'
				},
				{
					question: 'Dois-je arroser après la plantation ?',
					response: "Oui, arrosez généreusement pour aider les racines à bien s'établir."
				}
			]
		},
		{
			name: "Prendre soin de l'arbre",
			faqs: [
				{
					question: "À quelle fréquence vérifier l'arbre ?",
					response:
						"Une inspection mensuelle suffit pour s'assurer de sa santé et intervenir si nécessaire."
				},
				{
					question: "Comment savoir si l'arbre se porte bien ?",
					response:
						'Observez les feuilles, la couleur et la vitalité du tronc. Tout changement anormal peut indiquer un problème.'
				},
				{
					question: 'Comment soutenir le jeune arbre ?',
					response:
						"Installez un tuteur et attachez-le délicatement pour maintenir le tronc droit sans abîmer l'écorce."
				},
				{
					question: 'À quelle fréquence arroser ?',
					response:
						'Pendant les premières semaines, arrosez 1 à 2 fois par semaine si la pluie est insuffisante.'
				},
				{
					question: "Comment protéger l'arbre du bétail ou des animaux ?",
					response:
						"Installez une barrière légère ou un enclos autour du tronc pour éviter que l'arbre ne soit endommagé."
				},
				{
					question: 'Que faire pendant les périodes sèches ?',
					response:
						"Arrosez régulièrement et utilisez du paillage au pied pour maintenir l'humidité."
				}
			]
		}
	]
};

export const STEPS_DETAILS = [STEP_1_DETAILS, STEP_2_DETAILS];
