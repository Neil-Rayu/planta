let shade = Math.random() * 2 - 1;
let soilHealth = Math.random() * 2 - 1;
let birdCnt = Math.random();
let waterFall = Math.random() * 2 - 1;
let manaLevel = Math.round(Math.random() * 10);
let weedCnt;
let seasonMulti = Math.random() / 2 + 1;
let type = 0;
let season = 0;
console.log(shade, soilHealth, waterFall, seasonMulti);
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
var NaturalGeneticAlgorithm = function () {};
NaturalGeneticAlgorithm.prototype.generate = function (length) {
  let chromosome = '';
  for (let i = 0; i < length; i++) {
    if (Math.floor(Math.random() * 10) % 2 == 0) {
      chromosome += '1';
    } else {
      chromosome += '0';
    }
  }
  return chromosome;
};

NaturalGeneticAlgorithm.prototype.select = function (population, fitnesses) {
  let max = fitnesses[0];
  let index1 = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > max) {
      max = fitnesses[i];
      index1 = i;
    }
  }
  //this.simulateAppearance([population[index1][0], population[index1][1]],fitnesses[index1] );

  fitnesses.splice(index1, 1);
  let max2 = fitnesses[0];
  let index2 = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > max2) {
      max2 = fitnesses[i];
      index2 = i;
    }
  }
  return [population[index1], population[index2]];
};
NaturalGeneticAlgorithm.prototype.mutate = function (chromosome, p) {
  for (let i = 0; i < chromosome.length; i++) {
    if (Math.random() <= p) {
      if (chromosome.charAt(i) == '1') {
        chromosome =
          chromosome.substring(0, i) + '0' + chromosome.substring(i + 1);
      } else {
        chromosome =
          chromosome.substring(0, i) + '1' + chromosome.substring(i + 1);
      }
    }
  }
  return chromosome;
};
NaturalGeneticAlgorithm.prototype.crossover = function (
  chromosome1,
  chromosome2
) {
  let n = Math.floor(Math.random() * chromosome1.length);
  //console.log(n);
  let x = chromosome1;
  chromosome1 = chromosome1.substring(0, n) + chromosome2.substring(n);
  chromosome2 = chromosome2.substring(0, n) + x.substring(n);
  return [chromosome1, chromosome2];
};
NaturalGeneticAlgorithm.prototype.createPool = function (fitness, length) {
  // GENERATE INITIAL CHROMOSOMES
  let genePoolChromosomes = [[], [], [], [], [], [], [], [], [], []];
  let genePoolFitness = [];
  //Fill starting sunflower chromosomes
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 3; j++) {
      genePoolChromosomes[i].push(this.generate(length));
    }
  }
  //Get fitness for starting pool
  for (let i = 0; i < 10; i++) {
    genePoolFitness[i] = fitness(genePoolChromosomes[i]);
    // this.simulateApperance(
    //   [genePoolChromosomes[i][0], genePoolChromosomes[i][1]],
    //   genePoolFitness[i]
    // );
  }
  let sum = 0;
  genePoolFitness.forEach((e) => {
    sum += e;
  });
  document.getElementById('mana').innerText = sum.toFixed(3);
  return [genePoolChromosomes, genePoolFitness];
};
NaturalGeneticAlgorithm.prototype.naturalRun = function (
  fitness,
  genePoolChromosomes,
  genePoolFitness
) {
  console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
  //for (let gen = 0; gen < iterations; gen++) {
  let tempC = [[], [], [], [], [], [], [], [], [], [], [], []]; //new temp chromosome list
  for (let i = 0; i < 10; i += 2) {
    let cross = this.select(genePoolChromosomes, genePoolFitness); //Select Two
    //console.log(cross); //CONSOLE LOG!!
    for (let index = 0; index < 3; index++) {
      let dubleCross = this.crossover(
        //Returns the cross between x1 and y1 so two chromsomes
        this.mutate(cross[0][index], 0.005),
        this.mutate(cross[1][index], 0.005)
      );
      tempC[i].push(dubleCross[0]); //x
      tempC[i + 1].push(dubleCross[1]); //y
    }
  }
  //console.log(tempC);
  genePoolChromosomes = tempC;
  for (let i = 0; i < 10; i++) {
    genePoolFitness[i] = fitness(genePoolChromosomes[i]);
    // this.simulateApperance(
    //   [genePoolChromosomes[i][0], genePoolChromosomes[i][1]],
    //   genePoolFitness[i]
    // );
  }
  //console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
  let sum = 0;
  genePoolFitness.forEach((e) => {
    sum += e;
  });
  console.log('sum ' + sum);
  document.getElementById('mana').innerText = sum.toFixed(3);
  //console.log(sum / 10);
  if (genePoolFitness.includes(1)) {
    console.log('HELL YEAHHHS');
    //break;
  }
  //}
  return [genePoolChromosomes, genePoolFitness];
};

let nG = new NaturalGeneticAlgorithm();

let pool = nG.createPool(naturalFitness, 10);
console.log(pool);

//Timer
let text = document.getElementById('timer');
let night = document.getElementById('nightScreen');
let time = 0;
let downTime = 2;
function timer() {
  if (time > 15 && time < 35) {
    night.style.opacity = (time - 15) * 2 + '%';
  }
  if (time > 45 && time < 65) {
    night.style.opacity = (38 - downTime) / 100;
    downTime += 2;
  }
  if (time == 65) {
    pool = nG.naturalRun(naturalFitness, pool[0], pool[1]);
    console.log(pool);
    time = 0;
    season++;
  }
  text.innerText = time;
  time++;
}
let interval = setInterval(timer, 1000);
let pause = false;
function clearInt() {
  if (pause) {
    interval = setInterval(timer, 1000);
  } else {
    clearInterval(interval);
  }
  pause = !pause;
}
//Derive Info
function deriveInfo(chromosomes, fitness) {
  let species;
  let traits;
  let chromosome;
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
  document.getElementById('fitness').innerText =
    'Fitness: ' + fitness.toFixed(2);
  document.getElementById('generation').innerText = 'Generation: N/A';
  //document.getElementById('rarity').innerText = Math.pow(.5, traitCnt)
  return num;
}

//Set Up click events for each flower

function spotClick(spotNum) {
  let as = deriveInfo(pool[0][spotNum], pool[1][spotNum]);
  console.log(as);
  document.getElementById('microPopWild').style.display = 'flex';
}

function docClick() {
  document.getElementById('microPopWild').style.display = 'none';
}

function updateImage(num) {
  let img = document.getElementsByClassName('flowerImg');
  for (let i = 0; i < img.length; i++) {
    if (num == 0) {
      img[i].src = 'Images/flowerLiq200.png';
      document.getElementById('flowerCont').src = 'Images/flowerLiq200.png';
    } else if (num == 1) {
      img[i].src = 'Images/flowerTim200.png';
      document.getElementById('flowerCont').src = 'Images/flowerTim200.png';
    } else {
      img[i].src = 'Images/flowerImp200.png';
      document.getElementById('flowerCont').src = 'Images/flowerImp200.png';
    }
  }
}
