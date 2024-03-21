import { auth, uid, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';

let button = document.getElementById('sign');
let provider = new GoogleAuthProvider();
export let signedIn = false;
let geneViewMode = false;
button.onclick = async function sign() {
  if (signedIn) {
    signOut(auth);
    signedIn = false;
    button.innerText = 'Sign In';
  } else {
    await signInWithPopup(auth, provider);
    signedIn = true;
    button.innerText = 'Sign Out';
    getData();
  }
};
export async function getData() {
  const docRef = doc(db, 'garden', uid);
  console.log(docRef);
  const docSnap = await getDoc(docRef);
  geneViewMode = true;
  if (docSnap.exists()) {
    console.log(docSnap.data().chromosomes);
    let spec = deriveInfo(docSnap.data().chromosomes);
    let img = document.createElement('img');

    if (spec == 0) {
      img.src = 'Images/flowerLiq200.png';
      document.getElementById('flowerCont').src = 'Images/flowerLiq200.png';
    } else if (spec == 1) {
      img.src = 'Images/flowerTim200.png';
      document.getElementById('flowerCont').src = 'Images/flowerTim200.png';
    } else if (spec == 3) {
      img.src = 'Images/frostflower200.png';
      document.getElementById('flowerCont').src = 'Images/frostflower200.png';
    } else {
      img.src = 'Images/flowerImp200.png';
      document.getElementById('flowerCont').src = 'Images/flowerImp200.png';
    }
    img.style = 'position: absolute; top: 30px; left: 20px;';
    document.getElementById('fieldSpot1').appendChild(img);
  } else {
    // doc.data() will be undefined in this case

    console.log('No such document!');
  }
}

let fieldSpots = document.getElementsByClassName('fieldSpot');

fieldSpots[0].onclick = () => {
  document.getElementsByClassName('tut-text')[0].style.display = 'none';
  if (geneViewMode) {
    document.getElementById('microPop').style.display = 'flex';
  } else {
    document.getElementById('myForm').style.display = 'flex';
  }
};

async function removeOpt() {
  //e.preventDefault();
  document.getElementById('myForm').style.display = 'none';
  let genePoolChromosomes = [];
  for (let j = 0; j < 3; j++) {
    genePoolChromosomes.push(generate(10));
  }

  console.log(genePoolChromosomes);
  let spec = deriveInfo(genePoolChromosomes);
  await setDoc(doc(db, 'garden', uid), {
    chromosomes: genePoolChromosomes,
    type: spec,
  });
}
document.getElementById('formC').onsubmit = (e) => {
  e.preventDefault();
  removeOpt();
};

function generate(length) {
  let chromosome = '';
  for (let i = 0; i < length; i++) {
    if (Math.floor(Math.random() * 10) % 2 == 0) {
      chromosome += '1';
    } else {
      chromosome += '0';
    }
  }
  return chromosome;
}

function naturalFitness(chromosomes) {
  let traitCnt = 0;
  let seedCnt = 0;
  let heightCnt = 0;
  let rootCnt = 0;
  chromosomes[0].split('').forEach((base) => {
    if (Number(base) == 1) {
      traitCnt++;
    }
  });
  // chromosomes[1].forEach(base => {
  //       if(base == 1){
  //         seedCnt++;
  //       }
  // });
  chromosomes[1].split('').forEach((base) => {
    if (Number(base) == 1) {
      heightCnt++;
    }
  });
  chromosomes[2].split('').forEach((base) => {
    if (Number(base) == 1) {
      rootCnt++;
    }
  });
  if (traitCnt <= 3) {
    manaLevel += 3;
  } else if (traitCnt <= 5) {
    manaLevel += 1;
  } else if (traitCnt <= 7) {
    manaLevel += 2;
  } else if (traitCnt <= 9) {
    manaLevel += 3;
  } else {
    manaLevel += 4;
  }

  let multi = 1;
  if (shade > 0) {
    multi = 2;
  }
  let divi = 2;
  if (soilHealth > 0) {
    divi = 1;
  }
  let waterMulti = 0.3;
  if (waterFall > 0) {
    waterMulti = 2;
  }
  let manaMulti = 1;
  let seasonT = document.getElementById('season');
  if (season < 3) {
    seasonT.innerText = 'Season: Summer';

    if (traitCnt <= 3) {
      manaMulti = 0.75 * seasonMulti;
    } else if (traitCnt <= 5) {
      manaMulti = 1 * seasonMulti;
    } else if (traitCnt <= 7) {
      manaMulti = 1.5 * seasonMulti;
    } else if (traitCnt <= 9) {
      manaMulti = 2 * seasonMulti;
    } else {
      manaMulti = 0.5 * seasonMulti;
    }
  } else if (season <= 5) {
    seasonT.innerText = 'Season: Fall';

    if (traitCnt <= 3) {
      manaMulti = 1.25 * seasonMulti;
    } else if (traitCnt <= 5) {
      manaMulti = 1 * seasonMulti;
    } else if (traitCnt <= 7) {
      manaMulti = 0.8 * seasonMulti;
    } else if (traitCnt <= 9) {
      manaMulti = 0.7 * seasonMulti;
    } else {
      manaMulti = 1.5 * seasonMulti;
    }
  } else if (season < 9) {
    seasonT.innerText = 'Season: Winter';

    if (traitCnt <= 3) {
      manaMulti = 0.8 * seasonMulti;
    } else if (traitCnt <= 5) {
      manaMulti = 1 * seasonMulti;
    } else if (traitCnt <= 7) {
      manaMulti = 0.8 * seasonMulti;
    } else if (traitCnt <= 9) {
      manaMulti = 0.5 * seasonMulti;
    } else {
      manaMulti = 1 * seasonMulti;
    }
  } else {
    seasonT.innerText = 'Season: Spring';

    if (traitCnt <= 3) {
      manaMulti = 1.25 * seasonMulti;
    } else if (traitCnt <= 5) {
      manaMulti = 1 * seasonMulti;
    } else if (traitCnt <= 7) {
      manaMulti = 1.25 * seasonMulti;
    } else if (traitCnt <= 9) {
      manaMulti = 1.5 * seasonMulti;
    } else {
      manaMulti = 2 * seasonMulti;
    }
  }
  console.log(manaMulti);

  let fitness =
    heightCnt * shade * multi +
    (heightCnt * soilHealth) / divi +
    rootCnt * soilHealth * 2 +
    heightCnt * ((-1 * divi) / 2) +
    manaLevel * manaMulti;
  return fitness;
}

let microscope = document.getElementById('Microscope');
microscope.onclick = () => {
  geneViewMode = true;
  //console.log(geneViewMode);
};

let plantList = [
  {
    fieldSpot: 1,
    name: 'hello',
  },
];

function deriveInfo(chromosomes) {
  let species;
  let traits;
  let chromosome;
  let fitness;
  let generation;
  let traitCnt = 0;
  let num = 0;
  chromosomes[0].split('').forEach((base) => {
    if (Number(base) == 1) {
      traitCnt++;
    }
  });
  console.log(traitCnt);
  let phenoCnt = 0;
  chromosomes[1].split('').forEach((base) => {
    if (Number(base) == 1) {
      phenoCnt++;
    }
  });
  chromosomes[2].split('').forEach((base) => {
    if (Number(base) == 1) {
      phenoCnt++;
    }
  });
  console.log(phenoCnt);
  if (chromosomes[0].includes('1000101') && phenoCnt >= 13) {
    species = 'Fabularis';
    traits = '???';
  } else if (chromosomes[0].includes('110100100') && phenoCnt > 13) {
    species = 'Ultimus Fabularis';
    traits = '???';
    num = 3;
  } else if (traitCnt <= 1) {
    species = 'Liquidum';
    traits = 'Patient, Slow, Calm';
  } else if (traitCnt <= 3) {
    species = 'Liquidum Timidus';
    traits = 'Slow, Reserved, Fragile';
  } else if (traitCnt <= 5) {
    species = 'Timidus';
    traits = 'Reserved, Fragile, Chaotic';
    num = 1;
  } else if (traitCnt <= 7) {
    species = 'Impetus Timidus';
    traits = 'Irritable, Morally Deprived, Chaotic';
    num = 2;
  } else if (traitCnt <= 9) {
    species = 'Inpetus';
    traits = 'Irritable, Frustrated, Honorable';
    num = 2;
  }
  if (phenoCnt <= 7) {
    species += ' Brevis';
    traits += ', Small';
  } else if (phenoCnt <= 11) {
    species += ' Modus';
    traits += ', Medium Size';
  } else if (phenoCnt <= 19) {
    species += ' Magnus';
    traits += ', Large';
  } else {
    species += ' Gigas';
    traits += ', Giant';
  }
  console.log(species);
  document.getElementById('species').innerText = 'Species: ' + species;
  document.getElementById('traits').innerText = 'Traits: ' + traits;
  document.getElementById('chromosome').innerText =
    'Chromosomes: ' +
    chromosomes[0] +
    ', ' +
    chromosomes[1] +
    ', ' +
    chromosomes[2];
  document.getElementById('fitness').innerText = 'Fitness: '; //+ naturalFitness(chromosomes).toFixed(2);
  document.getElementById('generation').innerText = 'Generation: N/A';
  //document.getElementById('rarity').innerText = Math.pow(.5, traitCnt)
  return num;
}

//shop
let shopButton = document.getElementById('shop');

shopButton.onclick = () => {
  document.getElementById('shop-container').style.display = 'flex';
};

let closeShop = document.getElementById('close-shop');

closeShop.onclick = () => {
  document.getElementById('shop-container').style.display = 'none';
};

let buyDNA = document.getElementById('buy-dna');
let dnaStore = 0;

buyDNA.onclick = () => {
  dnaStore += 1;
  console.log(dnaStore);
};
