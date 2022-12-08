const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const dunyaKupasiFinali2014 = fifaData.filter( mac =>mac["Year"] === 2014 && mac["Stage"] === "Final"
	
)
console.log(dunyaKupasiFinali2014);
console.log("**********************");

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
console.log(dunyaKupasiFinali2014[0]['Home Team Name']);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(dunyaKupasiFinali2014[0]['Away Team Name']);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(dunyaKupasiFinali2014[0]['Home Team Goals']);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(dunyaKupasiFinali2014[0]['Away Team Goals']);
//(e) 2014 Dünya kupası finali kazananı*/
if(dunyaKupasiFinali2014[0]['Home Team Goals'] > dunyaKupasiFinali2014[0]['Away Team Goals'] ){
	console.log(console.log(dunyaKupasiFinali2014[0]['Home Team Name']));
}else if (dunyaKupasiFinali2014[0]['Home Team Goals'] < dunyaKupasiFinali2014[0]['Away Team Goals'] ){
	console.log(console.log(dunyaKupasiFinali2014[0]['Away Team Name']));
}else{
	const kazananTakımArrayi = 	finalMaci2014["Win consditions"].split(' win ');
	console.log(kazananTakımArrayi[0]);


}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(gelenVeri) {
	const tumFinaller = gelenVeri.filter(mac => mac['Stage'] === "Final");
	return tumFinaller;
}
console.log(Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(gelenVeri, callbackFunction) {
	let tumFinaller = callbackFunction(gelenVeri);
	let finalYillari = tumFinaller.map(final => final["Year"])
	return finalYillari;

}
console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(gelenVeri, callbackFinaller) {
	let finalVeri = callbackFinaller(gelenVeri);
	let kazananlarListe=[];
	for(let i = 0; i< finalVeri.length; i++){
		if(finalVeri[i]["Home Team Goals"]>finalVeri[i]["Away Team Goals"]){
			kazananlarListe.push(finalVeri[i]["Home Team Name"]);

		}else if(finalVeri[i]["Home Team Goals"]<finalVeri[i]["Away Team Goals"]){
			kazananlarListe.push(finalVeri[i]["Away Team Name"]);

		}else{
			let winArray= finalVeri[i]["Win conditions"].split(" win ");
			kazananlarListe.push(winArray[0]);
		}
	}
	return kazananlarListe;
	
}
console.log(Kazananlar(fifaData,Finaller));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaVerileri, finallerCallback, yillarCallback, kazananlarCallback) {
	
	let kazananlarListesi = finallerCallback(fifaVerileri).map((mac, i)=>{
		return mac.Year + " yılında, "+ kazananlarCallback(fifaVerileri, finallerCallback)[i] +" dünya kupasını kazandı!"
	})
	return kazananlarListesi;

}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
	const totalGoals = finaller.reduce((total, match) => total + match['Home Team Goals'] + match['Away Team Goals'],0);
	return (totalGoals / finaller.length).toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/*-+ 

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

console.clear();
let takımKısaltması = [];
fifaData.forEach(item => {
	if (!takımKısaltması.includes(item["Home Team Initials"])) {
		takımKısaltması.push(item["Home Team Initials"]);
	}
	if (!takımKısaltması.includes(item["Away Team Initials"])) {
		takımKısaltması.push(item["Away Team Initials"]);
	}
})
function UlkelerinKazanmaSayilari(gelenVeri,takımKısaltması) {
	let kazananlar = gelenVeri.filter(match => match["Stage"] === "Final").map(array => {
		if (array["Home Team Goals"] > array["Away Team Goals"]) {
			return array["Home Team Initials"];
		}
		else if (array["Home Team Goals"] < array["Away Team Goals"]) {
			return array["Away Team Initials"];
		} else {
			let kazananTakım = (array["Win conditions"]).split(" win")[0];
			if (kazananTakım === array["Home Team Name"]) {
				return array["Home Team Initials"];
			} else {
				return array["Away Team Initials"];
			}
		}
	});
	
	
		let kazanmaSayisi = kazananlar.reduce((total, kazanan) => {
			if (kazanan in total){
				 total[kazanan] += 1;
			}else{
				total[kazanan] = 1;
			}
			return total;
		},{})
		return kazanmaSayisi;
	}
console.log(UlkelerinKazanmaSayilari(fifaData, takımKısaltması));



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
