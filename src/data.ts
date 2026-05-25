import { ZodiacSign, TarotCard } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dateRange: 'Mar 21 - Apr 19',
    element: 'Fire',
    rulingPlanet: 'Mars',
    modality: 'Cardinal',
    strengths: ['Courageous', 'Passionate', 'Confident', 'Enthusiastic', 'Optimistic'],
    weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
    compatibility: ['Leo', 'Sagittarius', 'Gemini'],
    luckyStone: 'Diamond',
    colorHex: '#EF4444', // Red
    description: 'Aries is the first sign of the zodiac, representing birth, initiation, and the spark of consciousness. As fire signs ruled by Mars, Aries individuals are trailblazers who advance passionately into the unknown with courage, action, and childlike confidence.',
    spiritualLesson: 'To channel raw will into creative initiation without letting ego and impatience burn the bridges you build.'
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dateRange: 'Apr 20 - May 20',
    element: 'Earth',
    rulingPlanet: 'Venus',
    modality: 'Fixed',
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Stable', 'Sensual'],
    weaknesses: ['Stubborn', 'Possessive', 'Uncompromising', 'Resistant to change'],
    compatibility: ['Virgo', 'Capricorn', 'Cancer'],
    luckyStone: 'Emerald',
    colorHex: '#10B981', // Emerald Green
    description: 'Taurus represents the anchoring of spirit into physical form. Ruled by Venus, Taurians harbor a deep appreciation for beauty, sensory pleasure, and the abundance of nature. They possess immense endurance, acting as steady guardians of peace and material comfort.',
    spiritualLesson: 'To enjoy the physical realm of luxury and beauty while remaining unattached to possessions.'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dateRange: 'May 21 - Jun 20',
    element: 'Air',
    rulingPlanet: 'Mercury',
    modality: 'Mutable',
    strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Quick-witted'],
    weaknesses: ['Nervous', 'Inconsistent', 'Indecisive', 'superficial'],
    compatibility: ['Libra', 'Aquarius', 'Aries'],
    luckyStone: 'Pearl',
    colorHex: '#F59E0B', // Amber
    description: 'Gemini represents the power of communication, curiosity, and the integration of duality. Ruled by Mercury, the messenger, Geminis are intellectual explorers who weave ideas, stories, and connections across diverse perspectives with incredible agility.',
    spiritualLesson: 'To harmonize the twin sides of your nature, transitioning from superficial curiosity into deep cosmic synthesis.'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dateRange: 'Jun 21 - Jul 22',
    element: 'Water',
    rulingPlanet: 'Moon',
    modality: 'Cardinal',
    strengths: ['Tenacious', 'Highly imaginative', 'Loyal', 'Emotional', 'Sympathetic'],
    weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
    compatibility: ['Scorpio', 'Pisces', 'Taurus'],
    luckyStone: 'Ruby',
    colorHex: '#3B82F6', // Blue
    description: 'Cancer represents the divine matrix of emotional nourishment, home, and protective sanctuary. Soft on the inside but shielded by a hard outer shell, they are deeply in tune with the tides of the Moon, acting as empathetic nurturers and keepers of memory.',
    spiritualLesson: 'To build a secure inner home so you can share your deep empathy with the world without fear of absorption.'
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    dateRange: 'Jul 23 - Aug 22',
    element: 'Fire',
    rulingPlanet: 'Sun',
    modality: 'Fixed',
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy', 'Inflexible'],
    compatibility: ['Aries', 'Sagittarius', 'Gemini'],
    luckyStone: 'Peridot',
    colorHex: '#F59E0B', // Gold/Amber
    description: 'Leo is the radiant heart of the zodiac, ruled by the life-giving Sun itself. Leos represent self-expression, royal courage, and playful creative power. They are natural leaders who shine their warm light to uplift, protect, and inspire those around them.',
    spiritualLesson: 'To lead from the heart with generous nobility, recognizing that your light is a channel of the divine sun.'
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    dateRange: 'Aug 23 - Sep 22',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    modality: 'Mutable',
    strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical', 'Methodical'],
    weaknesses: ['Shyness', 'Worry', 'Overly critical of self and others', 'All work and no play'],
    compatibility: ['Taurus', 'Capricorn', 'Cancer'],
    luckyStone: 'Sapphire',
    colorHex: '#10B981', // Green
    description: 'Virgo represents self-purification, devotion, craft, and sacred service. Ruled by Mercury in its grounded form, Virgo translates chaos into beautiful, healthy, and pristine order. They have a sharp analytical mind dedicated to healing and assisting humanity.',
    spiritualLesson: 'To accept imperfection as part of the natural cosmic tapestry, practicing self-compassion while doing your practical best.'
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    dateRange: 'Sep 23 - Oct 22',
    element: 'Air',
    rulingPlanet: 'Venus',
    modality: 'Cardinal',
    strengths: ['Harmonious', 'Gentle', 'Fair-minded', 'Social', 'Diplomatic'],
    weaknesses: ['Indecisive', 'Avoids confrontations', 'Will carry a grudge', 'Self-pity'],
    compatibility: ['Gemini', 'Aquarius', 'Leo'],
    luckyStone: 'Opal',
    colorHex: '#EC4899', // Pink
    description: 'Libra represents the golden ratio, harmony, and the beautiful dance of relationships. Ruled by Venus, Libras seek cosmic symmetry and justice. They are ambassadors of peace who blend separate forces into beautiful, artistic, and balanced connections.',
    spiritualLesson: 'To find balance within yourself first, so you can make decisions from raw truth rather than people-pleasing.'
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    dateRange: 'Oct 23 - Nov 21',
    element: 'Water',
    rulingPlanet: 'Pluto / Mars',
    modality: 'Fixed',
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'A true friend'],
    weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
    compatibility: ['Cancer', 'Pisces', 'Virgo'],
    luckyStone: 'Topaz',
    colorHex: '#8B5CF6', // Purple/Violet
    description: 'Scorpio is the sign of psychological depth, alchemy, death, and regeneration. Ruled by Pluto, they probe beneath the surface of reality, shedding old skins to emerge as the higher eagle or phoenix, holding deep keys to power, loyalty, and healing.',
    spiritualLesson: 'To yield control and trust the flow of vulnerability, converting intensity into deep spiritual transformation.'
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    dateRange: 'Nov 22 - Dec 21',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    modality: 'Mutable',
    strengths: ['Generous', 'Idealistic', 'Great sense of humor', 'Philosophical'],
    weaknesses: ['Promises more than can deliver', 'Very impatient', 'Will say anything no matter how undiplomatic'],
    compatibility: ['Aries', 'Leo', 'Libra'],
    luckyStone: 'Turquoise',
    colorHex: '#EF4444', // Red-Orange
    description: 'Sagittarius is the cosmic archer, aiming their arrows at distant philosophical horizons. Ruled by prosperous Jupiter, they seek truth, adventure, wisdom, and expanded consciousness. They are joyful wanderers of both physical paths and spiritual systems.',
    spiritualLesson: 'To anchor your high-flying ideals in real lived values and speak truth filtered through loving-kindness.'
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    dateRange: 'Dec 22 - Jan 19',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    modality: 'Cardinal',
    strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Expecting the worst'],
    compatibility: ['Taurus', 'Virgo', 'Pisces'],
    luckyStone: 'Garnet',
    colorHex: '#4B5563', // Slate Slate
    description: 'Capricorn is the spiritual initiate climbing the mountain of evolution. Ruled by Saturn, the planet of structure and time, they represent integrity, mastery, discipline, and building legacy structures that endure the tides of history.',
    spiritualLesson: 'To climb with light steps, balancing ambitious outward service with inner emotional warmth.'
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    dateRange: 'Jan 20 - Feb 18',
    element: 'Air',
    rulingPlanet: 'Uranus / Saturn',
    modality: 'Fixed',
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising', 'Aloof'],
    compatibility: ['Gemini', 'Libra', 'Sagittarius'],
    luckyStone: 'Amethyst',
    colorHex: '#06B6D4', // Cyan
    description: 'Aquarius is the revolutionary water-bearer who pours down cosmic insights to revitalize the collective. Guarded by Uranus, they represent rebellion, innovative genius, humanitarian brotherhood, and thinking many steps ahead of their generation.',
    spiritualLesson: 'To connect with individuals with the same warmth and intimacy that you offer to the collective humanity.'
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    dateRange: 'Feb 19 - Mar 20',
    element: 'Water',
    rulingPlanet: 'Neptune / Jupiter',
    modality: 'Mutable',
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
    weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality', 'Can be a victim'],
    compatibility: ['Cancer', 'Scorpio', 'Taurus'],
    luckyStone: 'Aquamarine',
    colorHex: '#3B82F6', // Deep Blue
    description: 'Pisces is the final sign of the zodiac, representing the ocean of consciousness where all boundaries dissolve back into the source. Ruled by mystical Neptune, Pisces are natural mystics, dreamers, and artists who experience unity, empathy, and devotion.',
    spiritualLesson: 'To channel ocean tides into artistic or spiritual devotion instead of getting lost in illusions or escapism.'
  }
];

export const TAROT_DECK: TarotCard[] = [
  {
    id: '0_fool',
    name: 'The Fool',
    number: 0,
    arcana: 'Major',
    keywords: ['Beginnings', 'Innocence', 'Spontaneity', 'Faith', 'Leap of faith'],
    description: 'A young traveler stands on the edge of a cliff, looking up at the sky, ready to leap into the unknown. A white dog bounds at their heels, warning of danger or cheering them on. They carry a small pouch containing their past experience.',
    uprightMeaning: 'A call to take a leap of faith, launch a new adventure, embrace spontaneity, and trust the cosmos. You are starting with a clean slate.',
    reversedMeaning: 'Recklessness, fear of change, hesitation, taking unnecessary risks, or a holding back of vital initiation rules.',
    iconName: 'Compass'
  },
  {
    id: '1_magician',
    name: 'The Magician',
    number: 1,
    arcana: 'Major',
    keywords: ['Manifestation', 'Willpower', 'Resourcefulness', 'Skill', 'Desire'],
    description: 'Standing before an altar laden with the symbols of the four elements (wand, cup, sword, pentacle), the Magician raises a double-pointed wand to the heavens and points down to the earth, channeling celestial power to manifest intention into reality.',
    uprightMeaning: 'You possess the tools, knowledge, and power to manifest your goals. Direct your focus, apply your willpower, and act with clear alignment.',
    reversedMeaning: 'Manipulative behavior, wasted energy, untapped genius, illusions, or plans being delayed by lack of real preparation.',
    iconName: 'Wand'
  },
  {
    id: '2_high_priestess',
    name: 'The High Priestess',
    number: 2,
    arcana: 'Major',
    keywords: ['Intuition', 'Sacred knowledge', 'Divine feminine', 'Subconscious mind'],
    description: 'Sitting on a stone throne between two pillars of light and shadow (Boaz and Jachin), she holds a scroll marked with the word "Tora." A crescent moon sits at her feet, and a veil of pomegranates hangs behind her, hiding the depths of the temple.',
    uprightMeaning: 'Look inward for answer. Trust your intuition, study your dreams, and wait for hidden sacred truths to reveal themselves over time.',
    reversedMeaning: 'Ignoring your inner sage, listening to external chatter over inner bells, secret motives, or superficial spirituality.',
    iconName: 'Eye'
  },
  {
    id: '3_empress',
    name: 'The Empress',
    number: 3,
    arcana: 'Major',
    keywords: ['Femininity', 'Beauty', 'Nature', 'Nurturing', 'Abundance'],
    description: 'A beautifully radiant woman wearing a crown of stars sits on plush cushions in a field of golden wheat, surrounded by a peaceful forest and a winding river. The shield near her throne bears the symbol of Venus, denoting unconditional love and fertility.',
    uprightMeaning: 'A phase of absolute abundance, creative fertility, grounding in nature, and nurturing growth. It is a time to create, heal, and receive beauty.',
    reversedMeaning: 'Creative blocks, smothering behavior, dependent dependency, feeling disconnected from nature or your physical body.',
    iconName: 'Crown'
  },
  {
    id: '4_emperor',
    name: 'The Emperor',
    number: 4,
    arcana: 'Major',
    keywords: ['Authority', 'Structure', 'Solid foundations', 'Protection', 'Leadership'],
    description: 'An elder sits on a stone throne decorated with ram heads, holding an orb in one hand and an ankh scepter in the other. Behind him rise harsh, majestic mountains of discipline.',
    uprightMeaning: 'Take control of your territory. Establish systems, organize your priorities, protect those you care about, and lead with steady, mature logic.',
    reversedMeaning: 'Rigidity, domineering behavior, control issues, lack of discipline, or fighting against reasonable structures.',
    iconName: 'Shield'
  },
  {
    id: '5_hierophant',
    name: 'The Hierophant',
    number: 5,
    arcana: 'Major',
    keywords: ['Tradition', 'Spiritual wisdom', 'Institutions', 'Mentorship', 'Belief systems'],
    description: 'A religious leader sits between columns, holding a triple cross scepter. At his feet kneel two acolytes, representing the transmission of shared spiritual structures and systems.',
    uprightMeaning: 'Seek traditional wisdom, study deep sacred texts, participate in established structures, or find a guide or master to help your initiation.',
    reversedMeaning: 'Dogma, rebel philosophy, challenging the status quo, carving out your own unique path, unorthodoxy.',
    iconName: 'BookOpen'
  },
  {
    id: '6_lovers',
    name: 'The Lovers',
    number: 6,
    arcana: 'Major',
    keywords: ['Love', 'Harmony', 'Sacred choices', 'Alignment of values', 'Partnership'],
    description: 'An angelic presence blesses a couple standing in a garden, with the tree of life and the tree of knowledge behind them. They look up to the angel, bridging physical love and spiritual divinity.',
    uprightMeaning: 'Deep harmony in relationships, aligning your actions with your ethical values, and making choice from a state of inner unity.',
    reversedMeaning: 'Disharmony, misaligned priorities, inner conflict, bad decisions made under pressure, or relational disconnection.',
    iconName: 'Heart'
  },
  {
    id: '7_chariot',
    name: 'The Chariot',
    number: 7,
    arcana: 'Major',
    keywords: ['Direction', 'Control', 'Willpower', 'Victory', 'Overcoming obstacles'],
    description: 'A dark and light sphinx pull a golden chariot driven by a brave warrior crowned with stars. The sphinxes pull in opposing directions, requiring immense balance and focus to drive ahead.',
    uprightMeaning: 'Harness your opposing impulses and focus your intent. Through sheer willpower and discipline, you will achieve high victory over obstacles.',
    reversedMeaning: 'Lack of control, running into walls, losing direction, burn out, aggressive rushing without navigation.',
    iconName: 'Zap'
  },
  {
    id: '8_strength',
    name: 'Strength',
    number: 8,
    arcana: 'Major',
    keywords: ['Courage', 'Inner peace', 'Fortitude', 'Compassion', 'Taming the beast'],
    description: 'A serene woman crowned with flowers with an infinity symbol above her head gently closes the jaws of a fierce lion. She controls the wild beast not with irons, but with love and quiet patience.',
    uprightMeaning: 'Conquer challenges utilizing quiet fortitude, self-discipline, and loving-kindness. True strength lies in patience, not physical aggression.',
    reversedMeaning: 'Weakness, self-doubt, raw animalistic reaction, feeling overwhelmed by base desires, or depression.',
    iconName: 'Flame'
  },
  {
    id: '9_hermit',
    name: 'The Hermit',
    number: 9,
    arcana: 'Major',
    keywords: ['Soul searching', 'Inner guidance', 'Solitude', 'Wisdom', 'Inward mirror'],
    description: 'An elder stands alone on a snow-covered mountain at night, holding a single lantern containing a six-pointed star of wisdom, and a staff to support his journey.',
    uprightMeaning: 'Step away from social noise. Retreat into quiet reflection, look for answers within, and seek true guidance from your own inner lantern.',
    reversedMeaning: 'Loneliness, isolation, paranoia, returning to the crowd too early, or refusing to learn from quiet solitude.',
    iconName: 'Layers'
  },
  {
    id: '10_wheel_of_fortune',
    name: 'Wheel of Fortune',
    number: 10,
    arcana: 'Major',
    keywords: ['Fate', 'Karma', 'Turning point', 'Cycles', 'Cosmic luck'],
    description: 'A great bronze wheel carved with spiritual glyphs floats in the heavens, surrounded by mythological beasts. Some ascend while others descend, symbolizing the rising and falling tides of fate.',
    uprightMeaning: 'Change is coming. The wheel turns, reminding us that both joy and grief are cyclic. Open yourself to destiny and good fortune is likely.',
    reversedMeaning: 'Bad luck, resistance to change, breaking bad loops, karmic patterns returning, feeling trapped by random events.',
    iconName: 'RefreshCw'
  },
  {
    id: '11_justice',
    name: 'Justice',
    number: 11,
    arcana: 'Major',
    keywords: ['Justice', 'Truth', 'Clarity', 'Cause and effect', 'Accountability'],
    description: 'Sitting on her throne, a figure holds a double-edged sword upright in her right hand and balance scales in her left, representing absolute truth and cosmic karma.',
    uprightMeaning: 'Truth will prevail. Be honest, weigh your situations and actions with objectivity, and know that cosmic law matches action with outcome.',
    reversedMeaning: 'Injustice, bias, refusal to accept accountability, unfair treatment, or denial of truth.',
    iconName: 'Scale'
  },
  {
    id: '12_hanged_man',
    name: 'The Hanged Man',
    number: 12,
    arcana: 'Major',
    keywords: ['Sacrifice', 'New perspective', 'Surrender', 'Letting go', 'Pause'],
    description: 'A young man hangs upside down from a T-shaped living tree. His face is serene, surrounded by a radiant golden halo of wisdom, and his legs form a cross of peace.',
    uprightMeaning: 'A time of beautiful suspension. Yield control. Look at your challenges from a completely inverted view. Sacrificing old attachments brings peace.',
    reversedMeaning: 'Stalling, delay, wasted sacrifice, refusing to yield, fighting against inevitable adjustments.',
    iconName: 'Activity'
  },
  {
    id: '13_death',
    name: 'Death',
    number: 13,
    arcana: 'Major',
    keywords: ['Transformation', 'Endings', 'Rebirth', 'Shedding skins', 'Deep transition'],
    description: 'An armored skeleton riding a pale horse rides past. Emperors and children kneel before him. In the distance, a radiant sun rises between twin towers, promising new morning.',
    uprightMeaning: 'A vital chapter is closing. Let go of what no longer serves. Do not fear endings; they are the fertile soil from which rebirth emerges.',
    reversedMeaning: 'Resisting transformation, rotting situations carried along, fear of letting go, repeating dead habits.',
    iconName: 'Skull'
  },
  {
    id: '14_temperance',
    name: 'Temperance',
    number: 14,
    arcana: 'Major',
    keywords: ['Balance', 'Patience', 'Alchemy', 'Synergy', 'Divine synthesis'],
    description: 'A winged angel with a gold circle on their chest stands with one foot on land and one in water, gracefully pouring fluid between two golden cups without spilling a drop.',
    uprightMeaning: 'Synergy and balance. Blend opposing parts of your life gently. Practice moderation, pacing, and wait for your spiritual alchemy to complete.',
    reversedMeaning: 'Imbalance, excessive indulgence, internal clash, trying to mix elements that do not fit, lack of patience.',
    iconName: 'Sparkles'
  },
  {
    id: '15_devil',
    name: 'The Devil',
    number: 15,
    arcana: 'Major',
    keywords: ['Shadow self', 'Attachment', 'Illusion', 'Materialism', 'Boundaries'],
    description: 'A winged goat demon sits on a dark stone pedestal, to which a male and female figure are loosely chained by their necks. The chains are wide enough that they could slip off easily.',
    uprightMeaning: 'Become aware of your shadow self. Challenge your addictions, heavy attachments, limiting beliefs, and illusions of entrapment.',
    reversedMeaning: 'Releasing attachments, overcoming shadow habits, breaking old bonds of fear, rising into absolute sovereignty.',
    iconName: 'Moon'
  },
  {
    id: '16_the_tower',
    name: 'The Tower',
    number: 16,
    arcana: 'Major',
    keywords: ['Sudden change', 'Revelation', 'Ruined illusions', 'Awakening', 'Breakthrough'],
    description: 'A bolt of lightning strikes a tall crown-capped stone tower on a dark mountain peak. Fire pours from the windows, and two figures fall into the dark ocean below.',
    uprightMeaning: 'A sudden bolt of truth shatters false foundations. Painful but necessary; it frees you from confining structures and illusions.',
    reversedMeaning: 'Avoiding a necessary crash, clinging to rotten structures, minor crises prompting gradual restructuring.',
    iconName: 'CloudLightning'
  },
  {
    id: '17_the_star',
    name: 'The Star',
    number: 17,
    arcana: 'Major',
    keywords: ['Hope', 'Faith', 'Rejuvenation', 'Divine alignment', 'Healing energy'],
    description: 'A radiant naked maiden pours sparkling life-bringing waters onto the green earth and into a blue pond beneath a giant seven-pointed star of divine hope.',
    uprightMeaning: 'Healing wind is blowing. Your path is guided of hope. Rest, receive deep cosmic inspiration, and shed fear. Your future is secure.',
    reversedMeaning: 'Hopelessness, feeling disconnected, active spiritual blocks, self-doubt, lack of creative faith.',
    iconName: 'Sun'
  },
  {
    id: '18_the_moon',
    name: 'The Moon',
    number: 18,
    arcana: 'Major',
    keywords: ['Illusions', 'Fear', 'Anxiety', 'Secrets', 'The tides of dreams'],
    description: 'A golden moon containing a face shines over a landscape. A dog and wolf howl at it, and a lobster crawls from a dark ocean pool, walking a path between towers.',
    uprightMeaning: 'Navigate the fog. Hidden fears, dreams, or deep illusions are rising. Trust your subtle senses, explore the shadow, and avoid rushing inside the fog.',
    reversedMeaning: 'Release of deep dread, secret disclosures, truth cutting the fog, psychological integration of dreams.',
    iconName: 'Moon'
  },
  {
    id: '19_the_sun',
    name: 'The Sun',
    number: 19,
    arcana: 'Major',
    keywords: ['Vitality', 'Joy', 'Success', 'Enlightenment', 'Divine clarity'],
    description: 'A smiling child rides a beautiful white horse beneath a brilliant golden sun, surrounded by walls covered in bright summer sunflowers.',
    uprightMeaning: 'Radiant success, vitality, joy, and supreme alignment. Reality is clear, energy is high, and your spirit is in full divine flower.',
    reversedMeaning: 'Temporary clouds, minor delays in joy, unrealistic optimism, burn-out from over-exposure.',
    iconName: 'Sun'
  },
  {
    id: '20_judgement',
    name: 'Judgement',
    number: 20,
    arcana: 'Major',
    keywords: ['Reckoning', 'Calling', 'Spiritual awakening', 'Absolution', 'Decisions'],
    description: 'An archangel blows a golden trumpet in the sky. Below, souls rise from stone tombs, reaching up with open arms, ready to be weighed and reborn.',
    uprightMeaning: 'Your calling is sounding. Reflect on your past, resolve old karma, forgive yourself and others, and step into your higher purpose.',
    reversedMeaning: 'Ignoring the celestial call, self-doubt, dragging old skeletons of guilt, refusing to forgive or pivot.',
    iconName: 'Compass'
  },
  {
    id: '21_the_world',
    name: 'The World',
    number: 21,
    arcana: 'Major',
    keywords: ['Integration', 'Completion', 'Wholeness', 'Full circle', 'Triumph'],
    description: 'A beautiful dancer floats within a green laurel wreath, framed of four elemental guardians. She holds dual wands, celebrating the completed cycle.',
    uprightMeaning: 'The circle is complete. A triumphant journey of growth has culminated in beautiful wholeness, graduation, integration, and success.',
    reversedMeaning: 'Unfinished cycles, looking for shortcut closures, delays in final completion, stagnancy.',
    iconName: 'Globe'
  }
];
