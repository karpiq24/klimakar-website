<?php
//tytuł strony zależny od podstrony
$page = $_GET['strona'];
$page_title = 'Klima-Kar - Klimatyzacja samochodowa Wrocław';
if ($page == 'ogrzewanie-postojowe')
	$page_title = 'Klima-Kar - Ogrzewanie postojowe Wrocław';
?>

<!DOCTYPE HTML>
<html lang="pl">
	<head>
		<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-WCWVTWN');</script>
		<!-- End Google Tag Manager -->
		<title><?php echo $page_title; ?></title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
		<link rel="stylesheet" href="assets/css/main.css">
		<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css"><![endif]-->
		<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
		<?php
		if ($page == '') {
			echo '<link rel="canonical" href="https://klima-kar.wroclaw.pl/">';
		}
		else {
			echo "<link rel='canonical' href='https://klima-kar.wroclaw.pl/?strona=$page'>";
		}
		?>
		
		<meta name="description" content="Profesjonalny serwis we Wrocławiu. Klimatyzacje samochodowe oraz ogrzewania postojowe Webasto, Eberspächer i DEFA. Wrocław, ul. Grota Roweckiego 129, tel. 71 337 14 50.">
		<meta name="keywords" content="klima-kar, klimatyzacja, klimatyzacje, klimatyzacja samochodowa, klimatyzacje samochodowe, serwis klimatyzacji, Wrocław, Grota-Roweckiego, roweckiego, klima serwis, auto klima serwis, ołtaszyn, krzyki, ogrzewanie postojowe, webasto, eberspeacher, DEFA">	
	</head>
	
	<?php
	if (!$page)
	{
		echo '<body class="homepage">';
	}
	else if ($page=="kontakt")
	{
		echo '<body class="left-sidebar">';
	}
	else
	{
		echo '<body class="no-sidebar">';
	}
	?>
	
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCWVTWN"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	
	<script src="whcookies.js"></script>

		<!-- Header -->
			<div id="header-wrapper">
				<header id="header" class="container">
				
					<!-- Logo -->
						<div id="logo">
							<a href="/">
								<img src="images/logo.svg" alt="Logo Klima-Kar">
							</a>
						</div>
					
					<!-- Nav -->
						<nav id="nav">
							<ul>
								<?php if (!$page) echo '<li class="current">'; else echo '<li>'; ?><a href="/" title="Strona główna">Strona główna</a>
									<ul>
										<?php if ($page=="o-firmie") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=o-firmie" title="O firmie Klima-Kar">O firmie</a></li>
										<?php if ($page=="gwarancja") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=gwarancja" title="Klima-Kar Gwarancja">Gwarancja</a></li>
									</ul>
								</li>
								<?php if ($page=="klimatyzacja-samochodowa") echo '<li class="current">'; else echo '<li>'; ?><a href="?strona=klimatyzacja-samochodowa" title="Klimatyzacje samochodowe">Klimatyzacja</a>
									<ul>
										<?php if ($page=="konserwacja") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=konserwacja" title="Konserwacja klimatyzacji">Konserwacja klimatyzacji</a></li>
										<?php if ($page=="cennik") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=cennik" title="Klima-Kar Cennik">Cennik</a></li>
										<?php if ($page=="tunap") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=tunap" title="Dezynfekcja TUNAP">Dezynfekcja TUNAP</a></li>
										<?php if ($page=="bg") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=bg" title="Dezynfekcja BG">Dezynfekcja BG</a></li>
									</ul>
								</li>
								<?php if ($page=="ogrzewanie-postojowe") echo '<li class="current">'; else echo '<li>'; ?><a href="?strona=ogrzewanie-postojowe" title="Ogrzewania postojowe">Ogrzewanie postojowe</a>
									<ul>
										<?php if ($page=="webasto") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=webasto" title="Klima-Kar Webasto">Webasto</a></li>
										<?php if ($page=="eberspacher") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=eberspacher" title="Klima-Kar Eberspächer">Eberspächer</a></li>
										<?php if ($page=="defa") echo '<li class="ddcurrent">'; else echo '<li>'; ?><a href="?strona=defa" title="Klima-Kar DEFA">DEFA</a></li>
									</ul>								
								</li>
							</ul>
						</nav>
					
				</header>
			</div>

	<?php
	if ($page == 'galeria') {
	?>
			<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>

								<h2>Galeria zdjęć</h2>
								<div class="youtube">
								<iframe src="https://youtube.com/embed/yUBazwim6so?rel=0"></iframe>
								</div>

								<div class="grid">
									<div class="row no-collapse 25%">
										<div class="6u"><a href="images/galeria/war.JPG" class="image fit"><img src="images/galeria/war.JPG" alt="warsztat"></a></div>
										<div class="6u"><a href="images/galeria/lamb.JPG" class="image fit"><img src="images/galeria/lamb.JPG" alt="lambo"></a></div>
										<div class="6u"><a href="images/galeria/k2.jpg" class="image fit"><img src="images/galeria/k2.jpg" alt="kompresor"></a></div>
										<div class="6u"><a href="images/galeria/szyld.JPG" class="image fit"><img src="images/galeria/szyld.JPG" alt="szyld"></a></div>
										<div class="6u"><a href="images/galeria/merc.jpg" class="image fit"><img src="images/galeria/merc.jpg" alt="serwis Mercedes"></a></div>
										<div class="6u"><a href="images/galeria/sub.jpg" class="image fit"><img src="images/galeria/sub.jpg" alt="kompresor Subaru"></a></div>
										
									</div>
								</div>
							</article>
							
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
												
					</div>
				</div>
			</div>		
		<?php
		}elseif($page == 'o-firmie'){
		?>
			<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
							
								<h2>O nas</h2>

								<h3>Jesteśmy firmą rodzinną z dwupokoleniową tradycją w branży chłodnictwa.</h3>
								<h4>Lata dziewięćdziesiąte.</h4>
								<h3>Rok 1989. Początek wolnej Polski i początek naszej działalności.</h3>
								<p>W tamtym czasie zajmowaliśmy się serwisem zmechanizowanego sprzętu gospodarstwa domowego. Już od roku 1993 wprowadziliśmy do swojej oferty pełną obsługę urządzeń klimatyzacyjnych w samochodach osobowych i dostawczych. Na zdjęciu, przy lodówce stoi przyszły założyciel Klima-Kar – Krzysztof Karpiński.</p>

								<img class="image right" src="images/tata.webp" alt="" width="780" height="586">

								<img class="image left" src="images/1999.webp" alt="" width="1000" height="800">

								<h4>Nowa siedziba, nowa specjalizacja i nowa nazwa.</h4>

								<h3>Rok 1999. Klima-Kar.</h3>

								<p>Od roku 1999 firma nosi nazwę Klima-Kar i ma siedzibę przy ulicy Grota Roweckiego 129 we Wrocławiu. Od tej chwili skupiliśmy się na klimatyzacjach samochodowych.</p>

								<h4>Rozbudowa siedziby. Ogrzewania postojowe.</h4>

								<h3>Rok 2008. Rozwój.</h3>

								<p>W roku 2008 rozbudowaliśmy nasz serwis o dwa stanowiska z podnośnikami. Dodatkowo wprowadziliśmy do naszej oferty naprawy i montaż ogrzewań postojowych Webasto i Eberspächer. Niedługo później staliśmy się Autoryzowanym Serwisem Webasto i Autoryzowanym Serwisem Eberspächer.</p>

								<img class="image right" src="images/dron-1-1536x960.webp" alt="" width="1024" height="640">

								<h3>Nasz zespół jest tu dla Ciebie</h3>
								<p>W ostatnich latach zakresem naszej działalności są klimatyzacje samochodowe oraz ogrzewania postojowe Webasto i Eberspächer. Zapewniamy pełną i profesjonalną obsługę serwisową.</p>
								<p>Wyróżnia nas wieloletnie doświadczenie, które pozwala nam świadczyć usługi na najwyższym poziomie. Przeprowadziliśmy niezliczoną ilość interwencji serwisowych, czynności obsługowych i skomplikowanych napraw. Dajemy pewność, że Państwa pojazdem zajmie się osoba odpowiednio przeszkolona.</p>



								<h2>O firmie</h2>
								<p>Początek naszej działalności to rok 1989.<br>
								W tamtym czasie zajmowaliśmy się serwisem zmechanizowanego sprzętu gospodarstwa domowego.</p>
								
								<p>Od roku 1993 wprowadziliśmy do swojej oferty pełną obsługę urządzeń klimatyzacyjnych w samochodach osobowych i dostawczych.</p>
								
								<p>Od roku 1999 firma nosi nazwę Klima-Kar i ma siedzibę przy ulicy
								<strong>Grota Roweckiego 129 we Wrocławiu</strong>.
								W ostatnich latach zakresem naszej działalności są ogrzewania postojowe <strong>Webasto</strong>,
								<strong>Eberspächer</strong> i <strong>DEFA</strong> oraz <strong>klimatyzacja samochodowa</strong>.</p>
								
								<p>Jesteśmy firmą z wieloletnim doświadczeniem w branży klimatyzacji samochodowej. Nasza pasja i zaangażowanie sprawiają, że jesteśmy liderem w naprawach klimatyzacji samochodowej we Wrocławiu. Nasz zespół składa się z wykwalifikowanych specjalistów, którzy posiadają bogate doświadczenie w diagnozowaniu i naprawianiu układów klimatyzacji w różnorodnych pojazdach. Dzięki temu gwarantujemy skuteczne i trwałe rozwiązania, nawet w najbardziej skomplikowanych przypadkach. W Klima-Kar rozumiemy, jak ważna jest sprawna klimatyzacja w Twoim samochodzie. Dlatego dokładamy wszelkich starań, aby zapewnić Ci szybką i profesjonalną obsługę. Zapraszamy do skorzystania z naszych usług i dołączenia do grona zadowolonych klientów.</p>
								
							
							</article>
							
							<a href="?strona=gwarancja" title="Gwarancja Klima-Kar" class="button icon fa-wrench">Gwarancja</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
												
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'kontakt'){
		?>
			<!-- Main -->
				<div id="main-wrapper">
					<div class="container">
						<div class="row 200%">
							<div class="4u 12u$(medium)">
								<div id="sidebar">
							
									<!-- Sidebar -->
										<section>
											<h3>Klima-Kar</h3>
											<p>ul. gen. Stefana Grota Roweckiego 129<br>
											52-214 Wrocław, Polska<br></p>
											<p><strong><a href="tel:713371450">tel. 71 337 14 50</a><br>
											<a href="tel:605594506">kom. 605 594 506</a></strong><br>
											<strong>e-mail: <a href="mailto:serwis@klima-kar.pl">serwis@klima-kar.pl</a></strong></p>
										
											<p><strong>Wysyłając zapytanie o montaż ogrzewania postojowego prosimy pamiętać o podaniu:</strong></p>
											<ul class="default">
												<li>marka pojazdu</li>
												<li>model</li>
												<li>rocznik</li>
												<li>rodzaj, pojemność i moc silnika</li>
												<li>klimatyzacja manualna / automatyczna</li>
											</ul>
											
											<footer>
												<a href="mailto:serwis@klima-kar.pl" class="button icon fa-envelope">serwis@klima-kar.pl</a>
											</footer>	
											
										</section>
							
								</div>
							</div>
							<div class="8u 12u$(medium) important(medium)">
								<div id="content">

									<!-- Content -->
										<article>

											<h2>Mapa dojazdowa</h2>
											<div class="google-maps">
												<iframe src="https://maps.google.pl/maps?f=d&amp;source=s_d&amp;saddr=&amp;daddr=Genera%C5%82a+Stefana+Grota-Roweckiego+129,+52-214+Wroc%C5%82aw+(%22Klima-Kar%22+Klimatyzacje+Samochodowe)&amp;hl=pl&amp;geocode=CRqbNVdN9y6lFZoLCwMdN-MDASHYncYjmOQeJQ&amp;mra=ls&amp;sll=51.05576,17.032049&amp;sspn=0.009603,0.01929&amp;ie=UTF8&amp;ll=51.076351,17.04031&amp;spn=0.053926,0.085659&amp;z=13&amp;iwloc=ddw1&amp;output=embed"></iframe>
											</div>
											<a href="https://maps.google.pl/maps?f=d&amp;source=embed&amp;saddr=&amp;daddr=Genera%C5%82a+Stefana+Grota-Roweckiego+129,+52-214+Wroc%C5%82aw+(%22Klima-Kar%22+Klimatyzacje+Samochodowe)&amp;hl=pl&amp;geocode=CRqbNVdN9y6lFZoLCwMdN-MDASHYncYjmOQeJQ&amp;mra=ls&amp;sll=51.05576,17.032049&amp;sspn=0.009603,0.01929&amp;ie=UTF8&amp;ll=51.076351,17.04031&amp;spn=0.053926,0.085659&amp;z=13&amp;iwloc=ddw1">Wyświetl większą mapę</a>
										</article>
								</div>
							</div>
						</div>
					</div>
				</div>
		<?php
		}elseif($page == 'klimatyzacja-samochodowa'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>

								<h2>Klimatyzacje samochodowe</h2>
								
								<p>W pełni obsługujemy pojazdy z czynnikiem <strong>R12</strong>, <strong>R134a</strong>, <strong>R1234yf</strong> oraz <strong>R744</strong>.
								Serwisujemy klimatyzację w pojazdach nowoczesnych, jak i klasycznych. Dzięki wieloletniemu doświadczeniu wiemy, że kluczem jest precyzyjna diagnostyka. Nie narażamy klientów na niepotrzebne koszty – rzetelnie analizujemy problem, co przekłada się na realną oszczędność czasu i pieniędzy.</p>
																<img class="image right" src="images/manometry50p.webp" style="max-width:50%" title="Konserwacja klimatyzacji" alt="Serwis klimatyzacji">
								<p><strong>Naprawiamy i wymieniamy:</strong></p>
								<ul class="default">
									<li>sprężarki klimatyzacji (kompresory),</li>
									<li>przewody ciśnieniowe,</li>
									<li>chłodnice klimatyzacji (skraplacze),</li>
									<li>parowniki, nagrzewnice</li>
									<li>zawory rozprężne i osuszacze</li>
								</ul>

								<p><strong>Usługi dodatkowe:</strong></p>
								<ul class="default">
									<li>diagnostyka, lokalizacja nieszczelności</li>								
									<li>usuwanie nieprzyjemnych zapachów,</li>
									<li>płukanie układów po zatarciu kompresora</li>
									<li>napełnienie czynnikiem chłodniczym,</li>
									<li>wymiana filtrów,</li>
									<li>dezynfekcja chemiczna metodą ultradźwiękową (odgrzybianie),</li>
									<li><a href="?strona=tunap" title="Dezynfekcja TUNAP Klima-Kar">dezynfekcja metodą firmy TUNAP</a></li>
								</ul>
								
								<p><strong>Posiadamy na miejscu filtry kabinowe</strong> zwykłe oraz węglowe do większości 
								samochodów. Zachęcamy Państwa do corocznego odwiedzenia naszego serwisu w celu sprawdzenia prawidłowości działania klimatyzacji. Regularna konserwacja klimatyzacji pozwala uniknąć poważnych awarii, zaoszczędzić pieniądze i podwyższa wartość pojazdu.</p>
								<p>Gwarantujemy priorytetowe załatwianie reklamacji. Klient gwarancyjny obsługiwany jest bez kolejki i bez oczekiwania na rozpatrzenie gwarancji przez producenta części. Więcej informacji tutaj: <a href="?strona=gwarancja" title="Gwarancja Klima-Kar">Gwarancja Klima-Kar</a></p>
								
							</article>
							
							<a href="?strona=cennik" title="Cennik Klima-Kar" class="button alt icon fa-list">Cennik</a>
							<a href="?strona=konserwacja" title="Konserwacja klimatyzacji" class="button icon fa-question-circle">Dlaczego warto przyjechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
															
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'konserwacja'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>

								<h2>Konserwacja klimatyzacji</h2>
								<h4>Regularna konserwacja klimatyzacji pozwala uniknąć poważnych awarii, zaoszczędzić pieniądze 
								i podwyższa wartość pojazdu!</h4>

								<p>Olej zawarty w środkach chłodzących smaruje sprężarkę klimatyzacji. 
								Brak środka chłodzącego i smarującego oznacza zawsze ryzyko niedostatecznego smarowania sprężarki, 
								co w najgorszym wypadku kończy się całkowitą awarią układu klimatyzacji, a koszty jego naprawy mogą 
								sięgać kilku tysięcy złotych. Poza tym niedobór środka chłodzącego powoduje dodatkowe zużycie paliwa, 
								ponieważ sprężarka musi pracować częściej i dłużej, żeby odpowiednio ochłodzić wnętrze. Tych 
								wydatków mogą Państwo uniknąć.
								<br>Używane pojazdy wyposażone w instalację klimatyzacyjną osiągają z reguły wyższą cenę odsprzedaży - 
								pod warunkiem, że klimatyzacja działa bez zarzutu. Tak więc pieniądze zainwestowane w regularną 
								konserwację instalacji klimatyzacyjnej pojazdu zwiększają jego wartość i zwracają się przy jego odsprzedaży.</p>
								
								
								<h4>Klimatyzacja wykonuje ciężką pracę. Dlatego też wymaga pewnej uwagi.</h4>
								<img class="image right" src="images/us1.JPG" title="Konserwacja klimatyzacji" alt="Serwis klimatyzacji">
								<p><strong>Co roku - przegląd klimatyzacji:</strong></p>
								<ul class="default">
								<li>kontrola wzrokowa elementów układu,</li>
								<li>kontrola działania, wydajności i szczelności,</li>
								<li>wymiana filtra kabinowego przeciwpyłkowego,</li>
								<li>dezynfekcja - odgrzybianie parownika,</li>
								<li>w razie potrzeby uzupełnienie czynnika chłodniczego i środka smarującego.</li>
								</ul>
																
								<h4>Klimatyzacja chłodzi naprawdę dobrze tylko przy regularnym serwisowaniu.</h4>
								
								<p>Instalacja klimatyzacyjna w samochodzie nie jest bezobsługowa. 
								Przez węże i ich połączenia może uciec rocznie - w drodze "naturalnego parowania" i z powodu wibracji - do 10% środka 
								chłodzącego. Wydajność chłodzenia zmniejsza się przez to w stosunkowo krótkim czasie.</p>
							
								<h4>Niewłaściwie konserwowana klimatyzacja jest zagrożeniem dla Państwa zdrowia.</h4>
								
								<p>Filtr pyłkowy Państwa instalacji pracuje bardzo intensywnie: przepuszcza duże ilości 
								powietrza zewnętrznego na godzinę zatrzymując pył, kurz, zarodniki i inne zanieczyszczenia. Łatwo sobie 
								wyobrazić, że po około roku jest on już "nasycony" i należy go wymienić. Również inne części instalacji 
								klimatyzacyjnej wymagają szczególnej uwagi, gdyż niewłaściwa ich konserwacja niesie ze sobą pewne zagrożenia. 
								Przykładem tego jest parownik - znajdujący się pod tablicą rozdzielczą, w wilgotnym i ciemnym otoczeniu. 
								Dla bakterii, grzybów i innych mikroorganizmów stanowi on idealną przestrzeń życiową. Zarazki te przechodzą 
								dalej przez system wentylacji do wnętrza pojazdu. U osób wrażliwych wywołują one - poza niebezpieczeństwem 
								choroby - rozmaite reakcje alergiczne, jak np. kichanie, kaszel, łzawienie oczu. Dlatego też nie należy 
								czekać z konserwacją klimatyzacji, aż nieprzyjemny zapach z wentylacji w drastyczny sposób przypomni Państwu 
								o zagrożeniu dla zdrowia. Regularna dezynfekcja parownika rozwiązuje ten problem: wszelkie zarazki są trwale 
								usuwane i klimatyzacja nie budzi wątpliwości pod względem higienicznym.</p>
								
								<h4>Tylko dobrze konserwowane instalacje zapewniają korzyści pod względem bezpieczeństwa.</h4>
								
								<p>Jeśli w pojeździe jest gorąco, organizm ludzki szybciej ulega zmęczeniu. Reakcje są spowolnione, 
								a koncentracja słabsza. Powoduje to znaczący wzrost zagrożenia wypadkiem. Środkiem zaradczym są 
								instalacje klimatyzacyjne wystarczająco ochładzające wnętrze pojazdu. Jednakże te korzyści pod względem 
								bezpieczeństwa są zagwarantowane tylko wtedy, gdy instalacja pracuje nienagannie. To z kolei wymaga 
								regularnej konserwacji. Podobnie jest w zimie - tu włączenie klimatyzacji jest doskonałym środkiem 
								przeciwdziałającym zaparowaniu szyb. Dzięki temu mają Państwo niczym nie ograniczoną widoczność - 
								nieodzowny warunek właściwego reagowania na niebezpieczne sytuacje.</p>
								
								<h4>Konserwacja powinna być wykonywana tylko w fachowych warsztatach.</h4>
								
								<p>Instalacje klimatyzacyjne są wysoce złożonymi układami, a ich konserwacja wymaga użycia specjalnych 
								narzędzi kontrolnych, naprawczych i serwisowych. Poza tym personel warsztatu powinien być specjalnie 
								przeszkolony i posiadać odpowiednią wiedzę, a także doświadczenie. To mogą zaoferować Państwu tylko fachowcy.
								Dlatego w przypadku prac serwisowych i naprawczych instalacji klimatyzacyjnych cena nie może stanowić jedynego
								kryterium wyboru warsztatu.</p>
																
							</article>
							
							<a href="?strona=cennik" title="Cennik Klima-Kar" class="button icon fa-list">Cennik</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
														
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'ogrzewanie-postojowe'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
								<h2>Ogrzewanie postojowe</h2>
								
								<p>Jesteśmy autoryzowanym serwisem <strong>Webasto</strong> i <strong>Eberspächer</strong>. Nasze wieloletnie doświadczenie i wiedza pozwalają na wykonywanie profesjonalnych napraw i montaży nowych instalacji. Wykonujemy również naprawy gwarancyjne. Serwisujemy ponadto ogrzewania <strong>Ardic</strong>.</p>
								
								<p>Dlaczego mamy godzić się na wsiadanie do zimnego i wilgotnego samochodu jeśli możemy tego uniknąć, 
								a jednocześnie przedłużyć żywotność silnika? Prawidłowo działające <strong>ogrzewanie postojowe Webasto</strong> albo 
								<strong>Eberspächer</strong> to same korzyści dla pojazdu, jego właściciela oraz dla 
								środowiska.</p>
								<img class="image right" src="images/webastoauto.jpg" title="Źródło obrazu: https://www.webasto.com/" alt="Ogrzewanie postojowe">
								<h3>Jakie są zalety posiadania ogrzewania postojowego?</h3>
								<ul class="default">
								<li>Podgrzany do odpowiedniej temperatury silnik (nie występuje efekt tzw. zimnego startu).</li>
								<li>Ciepłe i przyjazne warunki wewnątrz pojazdu. Natychmiast po wejściu do niego.</li>
								<li>Czyste szyby – bezpieczne, suche i odlodzone.</li>
								<li>Mniejsze zużycie elementów silnika podczas rozruchu.</li>
								<li>Niski poziom zużycia paliwa i emisji spalin.</li>
								<li>Wygodne sterowanie - zegarem, pilotem lub telefonem komórkowym.</li>
								</ul>
								
								<h3>Jak działa wodne ogrzewanie postojowe?</h3>
								<p>Paliwowe, wodne ogrzewania postojowe (<b>Webasto</b> i <b>Eberspächer</b>) stosowane są w celu przygotowania samochodu do jazdy.
								Po włączeniu w ciągu kilkunastu do kilkudziesięciu minut nagrzeje się silnik, wnętrze pojazdu i rozmrożą się szyby. Ogrzewania wodne
								montowane są w obiegu płynu chłodzącego i stosowane są <strong>głównie w samochodach osobowych</strong>. Aktywuje się je w zależności 
								od wybranego sterowania - pilotem, telefonem komórkowym lub nastawiając w zegarze godzinę uruchomienia 
								albo odjazdu. Ciepło uzyskuje się poprzez spalanie paliwa pobieranego ze zbiornika. W komorze ogrzewania 
								płyn chłodzący nabiera temperatury i za pomocą pompy obiegowej przetłaczany jest do silnika oraz do 
								nagrzewnicy. Pracujący wentylator wtłacza przez kratki nawiewowe odpowiednio podgrzane powietrze do 
								wnętrza pojazdu. Warto pamiętać o zasadzie "czas ogrzewania = czas jazdy", aby akumulator rozruchowy był zawsze doładowany.</p>
								
								<h3>Jak działa powietrzne ogrzewanie postojowe?</h3>								
								<p>Paliwowe, powietrzne ogrzewania postojowe (<b>Webasto</b> i <b>Eberspächer</b>) montowane są niezależnie. 
								Stosowane są <strong>głównie w samochodach dostawczych i pojazdach ciężarowych</strong> w celu utrzymywania nastawionej temperatury
								we wnętrzu pojazdu. Ciepło uzyskuje się poprzez spalanie paliwa pobieranego ze zbiornika. Agregat tego typu ogrzewa powietrze i tłoczy 
								je za pomocą własnej dmuchawy. Konstrukcja urządzenia pozwala na ciągłą pracę. Świetnie nadaje się do spania w pojeździe.</p>
								
								<h3>Jakie są dostępne elementy sterujące dla ogrzewań postojowych Webasto i Eberspächer?</h3>								
								<p>Listy dostępnych włączników przedstawiamy na dedykowanych podstronach po kliknięciu w odpowiedni link:</p>
								<a href="?strona=webasto" title="Ogrzewanie Webasto" class="button">lista włączników Webasto</a>
								<a href="?strona=eberspacher" title="Ogrzewanie Eberspächer" class="button">lista włączników Eberspächer</a>
								<br><br>

								<h3>Ile kosztuje eksploatacja ogrzewania postojowego Webasto lub Eberspächer?</h3>								
								<p>W przypadku ogrzewania wodnego jeden trzydziestominutowy cykl ogrzewania samochodu osobowego w zimowy poranek kosztuje około złotówkę*.
								Warto zwrócić uwagę na fakt, że koszt eksploatacji częściowo się zwraca, ponieważ oszczędzamy 
								na paliwie, którego większą ilość potrzebowałby nienagrzany silnik.
								<br>
								Przykładowe ogrzewanie powietrzne Airtronic D2 o mocy 2kW pobiera w zależności od warunków od 0,1 do 0,28 litra na godzinę pracy.
								Daje nam to od 0,50 zł do 1,40 zł na godzinę*, a jeśli temperatura nie spada, to urządzenie przechodzi w tryb czuwania, więc koszt może być
								jeszcze niższy.<br>
								*Koszt orientacyjny przyjęty dla paliwa w cenie 5 zł za litr.</p>
								
								<h3>Ile kosztuje montaż ogrzewania postojowego Webasto lub Eberspächer?</h3>								
								<p>Ze względu na różnice techniczne pomiędzy modelami do każdego pojazdu przewidziano inny zestaw montażowy. Cena będzie się więc różniła
								w zależności od modelu pojazdu, a także wybranej mocy agregatu, wybranych elementów sterujących, a nawet stopnia integracji z systemem
								wentylacji. Dostępnych rozwiązań jest bardzo wiele ale możemy podać orientacyjny przedział od 6.500 zł w przypadku ogrzewań powietrznych do busów, do kilkunastu tysięcy zł w przypadku skomplikowanych instalacji w autach osobowych.</p>
								
								<h3>Co to jest rozbudowa dogrzewacza do ogrzewania postojowego?</h3>								
								<p>Wiele aut fabrycznie wyposażono w dogrzewacze silnika diesla. Użytkownicy często nie wiedzą, że ich samochód ma dodatkowe ogrzewanie spalinowe. Dogrzewacz uruchamia się w niskich temperaturach, aby przyspieszyć osiągnięcie temperatury roboczej silnika. Takie dogrzewacze można przerobić na ogrzewanie postojowe. Koszt rozbudowy jest znacznie niższy, niż montażu ogrzewania postojowego od zera. Zainteresowanych prosimy o kontakt.</p>
								
								<h3>Ile kosztuje diagnostyka ogrzewania postojowego Webasto lub Eberspächer?</h3>								
								<p>250 zł brutto</p>
								
								
								
							</article>
							
							<a href="?strona=defa" title="Ogrzewanie DEFA" class="button icon fa-plug">Zobacz też DEFA.</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
														
					</div>
				</div>
			</div>
								
		<?php
		}elseif($page == 'defa'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<img class="image right" src="images/defa-silnik.png" title="Źródło obrazu: https://www.defa.com/" alt="DEFA grzałka silnika">
								<h2>Elektryczne ogrzewanie postojowe DEFA</h2>
								
								<p>Oferujemy sprzedaż części i montaż systemów ogrzewania DEFA, a także obsługę i rozbudowę istniejących instalacji.</p>
								
								<p>Elektryczne ogrzewanie postojowe DEFA do działania <strong>wymaga zasilania prądem przemiennym z sieci 
								230V.</strong> Kompletny system DEFA WarmUp składa się z grzałki silnika, ogrzewacza wnętrza, 
								elektronicznej ładowarki akumulatora i jednostki sterującej.</p>
								
								<p>Zaletą systemu DEFA WarmUp jest jego <strong>modułowa budowa</strong> pozwalająca na dostosowanie systemu 
								do potrzeb i wymagań użytkownika. Nic nie stoi na przeszkodzie, by wyposażyć pojazd wyłącznie w grzałkę 
								silnika.</p>
								<img class="image left" src="images/defa-ladowanie.png" title="Źródło obrazu: https://www.defa.com/" alt="DEFA ładowarka akumulatora">
								<p>Do większości jednostek napędowych występuje specjalnie dedykowana <strong>grzałka silnika</strong>. 
								Rozruch wstępnie podgrzanego silnika jest łatwiejszy i oznacza istotne zmniejszenie zużycia paliwa, a także 
								obniżenie zużycia samego silnika w porównaniu do startu „na zimno”. Kolejną zaletą jest ograniczenie 
								szkodliwych dla środowiska emisji.</p>
								<img class="image right" src="images/defa-wnetrze.png" title="Źródło obrazu: https://www.defa.com/" alt="DEFA ogrzewacz wnętrza">
								<p>Niebezpiecznie jest jeździć z zaparowanymi i zamarzniętymi 
								szybami. <strong>Ogrzewacz wnętrza</strong> zapewnia komfortową temperaturę wnętrza pojazdu. Ciepłe wnętrze pozwala 
								zapomnieć o parowaniu szyb i porannym skrobaniu lodu.</p>

								<p><strong>Elektroniczna ładowarka</strong> daje pewność naładowanego 
								do pełna akumulatora. Zaawansowana elektronika zapobiega przeładowaniu, a akumulator jest prawidłowo 
								ładowany niezależnie od temperatury na zewnątrz.</p>
								<p>Ogrzewanie postojowe <strong>DEFA</strong> to same korzyści dla pojazdu, jego właściciela oraz dla środowiska.</p>
								<div class="clearing"></div>
								
							</article>
							<a href="?strona=ogrzewanie-postojowe" title="Ogrzewanie postojowe" class="button icon fa-fire">Zobacz też Webasto i Eberspächer.</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
			
		<?php
		}elseif($page == 'promocja'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Promocja przedsezonowa</h2>
								
								<p><strong>Przyjedź przed sezonem - oszczędzaj czas i pieniądze.</strong></p>
								<p>Na hasło: <i><strong>"promocja przedsezonowa"</strong></i> oferujemy usługi w niższych cenach.</p>
								
								<ul class="default">
								<li>Odgrzybianie ultradźwiękowe - chemiczne <strong>70 zł</strong> zamiast 90 zł.</li>
								<li>Odgrzybianie ręczne - chemiczne TUNAP <strong>200 zł</strong> zamiast 250 zł.</li>
								<li>Przy zakupie filtra kabinowego wymiana <strong>GRATIS</strong>.</li>
								<li>Darmowe sprawdzenie poprawności działania klimatyzacji<strong>*</strong>.</li>
								</ul>
																
								<p>Promocja trwa od 10 lutego 2020 do końca kwietnia 2020.</p>
								<p><strong>*</strong> Darmowe sprawdzenie poprawności działania klimatyzacji oznacza kontrolę wzrokową i wydajnościową układu.
								Nie dotyczy diagnostyki awarii układu klimatyzacji, lokalizowania nieszczelności.</p>
																
							</article>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'webasto'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
								<h2>Webasto</h2>	
								
								<p>Jesteśmy autoryzowanym serwisem Webasto. Nasze wieloletnie doświadczenie i wiedza pozwalają na wykonywanie profesjonalnych napraw i montaży nowych instalacji. Wykonujemy również naprawy gwarancyjne.</p>
								
								<h2>Webasto - dostępne elementy sterujące</h2>								

								<h3>MultiControl</h3>
								
								<p>Nowoczesny programator Webasto MultiControl umożliwia wygodną i intuicyjną obsługę ogrzewania postojowego we wnętrzu pojazdu.</p>
								<img class="image right" src="images/MC.jpg" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto MultiControl">
								<ul class="default">
								<li>Menu w języku polskim</li>
								<li>Prosta funkcja włączania i wyłączania ogrzewania jednym przyciskiem</li>
								<li>Funkcja wyświetlania informacji zwrotnej</li>
								<li>Szybka i intuicyjna obsługa za pomocą przejrzystego wyświetlacza i wygodnego przycisku</li>
								<li>Montaż możliwy bez wiercenia</li>
								<li>Czytelny sposób wyświetlania wszystkich zaprogramowanych czasów załączenia i wyłączenia ogrzewania</li>
								<li>3 ustawiane czasy włączania na dzień, możliwość zaprogramowania na 7 dni z góry</li>
								<li>Wbudowany czujnik temperatury</li>
								</ul>
																
								<p>MultiControl to idealne rozwiązanie dla osób wymagających ogrzanego samochodu w tym samym czasie każdego dnia.</p>
								
								<h3>Telestart T91 i Telestart T99</h3>
								
								<p>Niezawodny pilot Webasto T91 i T99 umożliwia zdalne włączanie i wyłączanie ogrzewania postojowego.</p>
								<img class="image right" src="images/t91.jpg" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto Telestart T91">
								<img class="image right" src="images/t99.webp" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto Telestart T99">
								<ul class="default">
								<li>Aktywacja urządzenia z dystansu nawet do 1.000 metrów</li>
								<li>Uruchomienie ogrzewania jest potwierdzane za pomocą funkcji informacji zwrotnej</li>
								<li>Najprostsza obsługa dzięki przyciskom On / Off</li>
								<li>Eleganckie wzornictwo i wytrzymała, niewielka obudowa</li>
								<li>Funkcja wyboru grzania lub wentylacji (zima/lato)</li>
								<li>Możliwość wyboru czasu działania od 10 do 120 minut</li>								
								</ul>
								
								<h3>Telestart T100</h3>
								
								<p>Niezawodny pilot Webasto T100 umożliwia zdalne włączanie i wyłączanie ogrzewania postojowego, a także zaprogramowanie w cyklu 24h jednej godziny odjazdu, na którą auto zostanie przygotowane do jazdy.</p>
								<img class="image right" src="images/t100.jpg" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto Telestart T100">
								<ul class="default">
								<li>Aktywacja urządzenia z dystansu nawet do 1.000 metrów</li>
								<li>Uruchomienie ogrzewania jest potwierdzane za pomocą funkcji informacji zwrotnej</li>
								<li>Prosta obsługa dzięki przyciskom On / Off i lewo / prawo</li>
								<li>Eleganckie wzornictwo i wytrzymała, niewielka obudowa</li>
								<li>Funkcja wyboru grzania lub wentylacji (zima/lato)</li>
								<li>Programowanie czasu odjazdu - pilot sam obliczy czas ogrzewania na podstawie temperatury oraz wybranego poziomu komfortu od C1 do C5 i uruchomi ogrzewanie o odpowiedniej porze</li>
								<li>Odczyt temperatury panującej we wnętrzu pojazdu</li>								
								</ul>
								
								<h3>ThermoCall</h3>
								
								<p>Za pomocą ThermoCall można sterować pracą ogrzewania postojowego w dowolnym momencie i z dowolnego miejsca w zasięgu sieci GSM. Wystarczy zadzwonić lub wysłać SMS ręcznie, bądź korzystając z wygodnej w obsłudze aplikacji. Aplikacja zapewnia pełną kontrolę nad ogrzewaniem. W urządzeniu ThermoCall należy umieścić kartę SIM.</p>
								<img class="image right" src="images/TC.png" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto ThermoCall">
								<ul class="default">
								<li>Dedykowana aplikacja dostępna jest bezpłatnie na stronie: <a href="https://www.webasto-comfort.com/int/product-overview/product/show/thermocall-tc4/" title="Webasto ThermoCall">Webasto ThermoCall</a></li>
								<li>Komfort i elastyczność</li>
								<li>Ogrzewanie lub wentylacja po wciśnięciu jednego przycisku</li>
								<li>Możliwość zaprogramowania czasu ogrzewania z 24-godzinnym wyprzedzeniem</li>
								<li>Funkcja informacji o statusie urządzenia, ustawieniach, temperaturze we wnętrzu pojazdu i napięcia akumulatora</li>
								</ul>
								<p>Korzystanie z ThermoCall wymaga odpowiednio doładowanej i aktywnej karty SIM. Funkcja informacji zwrotnej może generować dodatkowe koszty, w zależności od indywidualnej umowy z operatorem. Karta SIM nie jest dostarczana wraz z urządzeniem.</p>
								
								<h3>ThermoConnect (nowość)</h3>
								<p>Interfejs ten jest oparty na komunikacji internetowej między użytkownikiem, a ogrzewaniem postojowym. Pierwszy rok jest bezpłatny, a każdy kolejny wymaga opłacania abonamentu 35 € rocznie.</p>
								<img class="image right" src="images/ThermoConnect.jpg" title="Źródło obrazu: https://www.webasto.com/" alt="Webasto Telestart T100">
								<h4>Funkcje ogrzewania:</h4>
								<ul class="default">
								<li>Włączanie i wyłączanie ogrzewania za pomocą przycisku, aplikacji lub aplikacji internetowej</li>
								<li>Do jednego ThermoConnect można podłączyć dwa ogrzewania i zarządzać nimi za pomocą jednej aplikacji</li>
								<li>Kilkoma odbiornikami ThermoConnect można zarządzać za pomocą jednej aplikacji</li>
								<li>Możliwość wyboru jednorazowego i powtarzalnego timera, możliwe uruchamianie oparte na pozycji GPS</li>
								</ul>
								<h4>Funkcje GPS:</h4>
								<ul class="default">
								<li>Położenie pojazdu można zlokalizować za pomocą aplikacji ThermoConnect i aplikacji internetowej</li>
								<li>Geo-fencing (ogrodzenie cyfrowe): ostrzega, gdy ThermoConnect opuszcza wybrany obszar geograficzny</li>
								<li>Zdarzenia oparte na lokalizacji: ThermoConnect uruchamia akcję przy wjeździe lub wyjeździe z określonego obszaru geograficznego</li>
								</ul>
								<h4>Funkcje dodatkowe:</h4>
								<ul class="default">
								<li>Wyświetlanie temperatury w kabinie</li>
								<li>Stan napięcia baterii</li>
								</ul>
								<p>Link do My Webasto Connect: <a href="https://my.webastoconnect.com" title="My Webasto Connect">My Webasto Connect</a></p>

																
							</article>
							<a href="?strona=ogrzewanie-postojowe" title="Ogrzewanie postojowe" class="button icon fa-fire">Ogrzewanie postojowe</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'eberspacher'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
								<h2>Eberspächer</h2>	
								
								<p>Jesteśmy autoryzowanym serwisem Eberspächer. Nasze wieloletnie doświadczenie i wiedza pozwalają na wykonywanie profesjonalnych napraw i montaży nowych instalacji. Wykonujemy również naprawy gwarancyjne.</p>
							
								<h2>Eberspächer - dostępne elementy sterujące</h2>								

								<h3>EasyStart Select</h3>
								
								<p>Włącznik Eberspächer EasyStart Select umożliwia najprostszą obsługę ogrzewania postojowego we wnętrzu pojazdu. Zalecany do ogrzewań powietrznych.</p>
								<img class="image right" src="images/ess.jpg" title="Źródło obrazu: https://www.eberspacher.com/" alt="EasyStart Select">
								<ul class="default">
								<li>Prosta funkcja włączania i wyłączania ogrzewania jednym przyciskiem</li>
								<li>Funkcja wyświetlania informacji zwrotnej</li>
								<li>Szybka i intuicyjna obsługa za pomocą przejrzystego wyświetlacza i wygodnych przycisków</li>
								<li>Czytelny sposób wyświetlania nastawionej i aktualnej temperatury</li>
								</ul>
								
								<h3>EasyStart Timer</h3>
								
								<p>Programator Eberspächer EasyStart Timer umożliwia obsługę ogrzewania postojowego we wnętrzu pojazdu i programowanie w cyklu tygodniowym.</p>
								<img class="image right" src="images/est.jpg" title="Źródło obrazu: https://www.eberspacher.com/" alt="EasyStart Timer">
								<ul class="default">
								<li>Prosta funkcja włączania i wyłączania ogrzewania, a także wyboru czasu pracy</li>
								<li>Funkcja wyświetlania informacji zwrotnej</li>
								<li>Szybka i intuicyjna obsługa za pomocą przejrzystego wyświetlacza i wygodnych przycisków</li>
								<li>Czytelny sposób wyświetlania wszystkich zaprogramowanych czasów załączenia i wyłączenia ogrzewania</li>
								<li>Możliwość ustawienia trzech programów w cyklu tygodniowym</li>						
								</ul>
								
								<h3>EasyStart Remote</h3>
								
								<p>Zdalne sterowanie radiowe Eberspächer EasyStart Remote umożliwia włączanie i wyłączanie ogrzewania na odległość.</p>
								<img class="image right" src="images/esr.jpg" title="Źródło obrazu: https://www.eberspacher.com/" alt="EasyStart Remote">
								<ul class="default">
								<li>Aktywacja urządzenia z dystansu nawet do 1.000 metrów</li>
								<li>Uruchomienie ogrzewania jest potwierdzane za pomocą funkcji informacji zwrotnej</li>
								<li>Najprostsza obsługa dzięki przyciskom Wł. / Wył.</li>
								<li>Eleganckie wzornictwo i wytrzymała, niewielka obudowa</li>
								<li>Funkcja wyboru grzania lub wentylacji (zima/lato)</li>
								<li>Możliwość wyboru czasu działania od 10 do 60 minut</li>								
								</ul>
								
								<h3>EasyStart Remote+</h3>
								
								<p>Zdalne sterowanie radiowe Eberspächer EasyStart Remote+ z wyświetlaczem i zintegrowanym tygodniowym programowaniem.</p>
								<img class="image right" src="images/esr+.jpg" title="Źródło obrazu: https://www.eberspacher.com/" alt="EasyStart Remote+">
								<ul class="default">
								<li>Aktywacja urządzenia z dystansu nawet do 1.000 metrów</li>
								<li>Uruchomienie ogrzewania jest potwierdzane za pomocą funkcji informacji zwrotnej</li>
								<li>Prosta obsługa dzięki przyciskom Wł. / Wył. i lewo / prawo</li>
								<li>Eleganckie wzornictwo i wytrzymała, niewielka obudowa</li>
								<li>Funkcja wyboru grzania lub wentylacji (zima/lato)</li>
								<li>Programowanie czasu odjazdu - pilot sam obliczy czas ogrzewania na podstawie temperatury i uruchomi ogrzewanie o odpowiedniej porze</li>
								<li>Możliwość ustawienia trzech programów w cyklu tygodniowym</li>
								<li>Odczyt temperatury panującej we wnętrzu pojazdu</li>	
								</ul>
								
								<h3>EasyStart WEB</h3>
								
								<p>Za pomocą Eberspächer EasyStart WEB można sterować pracą ogrzewania postojowego w dowolnym momencie i z dowolnego miejsca w zasięgu sieci. Serwer internetowy otrzymuje informację, którą przekazuje dalej za pomocą sieci mobilnej do odbiornika. Aplikacja na smartfony zapewnia pełną kontrolę nad ogrzewaniem. EasyStart WEB do działania nie potrzebuje karty SIM.</p>
								<img class="image right" src="images/esw.jpg" title="Źródło obrazu: https://www.eberspacher.com/" alt="EasyStart WEB">
								<ul class="default">
								<li>Dedykowana aplikacja dostępna jest bezpłatnie w sklepach Google Play i Apple AppStore</li>
								<li>Możliwość sterowania poprzez przeglądarkę internetową</li>
								<li>Komfort i elastyczność</li>
								<li>W zestawie przycisk z diodą do szybkiego włączania i wyłączania ogrzewania</li>
								<li>Programowanie czasu odjazdu - system sam obliczy czas ogrzewania na podstawie temperatury i uruchomi ogrzewanie o odpowiedniej porze</li>
								<li>Funkcja informacji o statusie urządzenia, ustawieniach, temperaturze we wnętrzu pojazdu</li>
								</ul>
								<p>Korzystanie z EasyStart WEB wymaga opłacania abonamentu. Koszt na dzień 12.11.2020 wynosi 129 zł rocznie. Więcej informacji tutaj: <a href="https://myeberspaecher.com/" title="EasyStart WEB">https://myeberspaecher.com/</a></p>
																
							</article>
							<a href="?strona=ogrzewanie-postojowe" title="Ogrzewanie postojowe" class="button icon fa-fire">Ogrzewanie postojowe</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'rodo'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Ochrona danych</h2>
								
								<p>Zgodnie z art. 13 ust. 1 i 2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) (Dz. Urz. UE L 119 z 04.05.2016, str. 1), dalej „RODO”, Usługodawca informuje, że:<br>
								Administratorem danych osobowych w rozumieniu rozporządzenia o ochronie danych osobowych (RODO) jest:<br>
								Klima-Kar Renata Karpińska<br>
								ul. gen. Stefana Grota-Roweckiego 129<br>
								52-214 Wrocław
								</p>								
								<p>W sprawach dotyczących przetwarzania danych należy kontaktować się na adres <a href="mailto:serwis@klima-kar.pl">serwis@klima-kar.pl</a>.</p>
								<p>Pani/Pana dane osobowe przetwarzamy w celu zawarcia i wykonania umowy. Zakres przetwarzanych danych: imię, nazwisko, adres pocztowy, nr telefonu, adres e-mail, NIP (w przypadku osób prowadzących działalność gospodarczą), nr rachunku bankowego, dane dotyczące samochodu oraz generowane przez samochód, historia samochodu.

								Pobieramy tylko te dane, bez których dana usługa nie może zostać wykonana. Niepodanie danych niezbędnych do zawarcia umowy i wykonania usługi spowoduje, że nie będziemy mogli zawrzeć umowy lub wykonać usługi. Dotyczy to także danych, które musimy zebrać z uwagi na ciążący na nas obowiązek prawny (np. dane do faktur/rachunków itp.). Okres przechowywania danych jest powiązany z celami i podstawami ich przetwarzania.</p>
								
								<p>Posiada Pani/Pan:</p>
								<ul class="default">
								<li>na podstawie art. 15 RODO prawo dostępu do danych osobowych Pani/Pana dotyczących;</li>
								<li>na podstawie art. 16 RODO prawo do sprostowania Pani/Pana danych osobowych;</li>
								<li>na podstawie art. 17 RODO prawo do usunięcia danych z wyjątkiem gdy przetwarzanie danych jest konieczne do wywiązania się z prawnego obowiązku lub do ustalenia, dochodzenia lub obrony roszczeń;
								</li>
								<li>na podstawie art. 18 RODO prawo żądania od administratora ograniczenia przetwarzania   danych osobowych z zastrzeżeniem przypadków, o których mowa w art. 18 ust. 2 RODO;</li>
								<li>na podstawie art. 20 RODO prawo do przenoszenia danych;</li>
								<li>prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna Pani/Pan, że przetwarzanie danych osobowych Pani/Pana dotyczących narusza przepisy RODO.</li>
								</ul>
								
								<p>Nie przysługuje Pani/Panu:</p>
								<ul class="default">
								<li>na podstawie art. 21 RODO prawo sprzeciwu, wobec przetwarzania danych osobowych, gdyż podstawą prawną przetwarzania Pani/Pana danych osobowych jest art. 6 ust. 1 lit. b RODO.</li>
								</ul>						
																
							</article>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'cennik'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Cennik - klimatyzacje - samochody osobowe</h2>								

								<h3>Dezynfekcja:</h3>
								<table class="default">
								<tbody>
								<tr>
								<td>Dezynfekcja chemiczna metodą ultradźwiękową - zapobieganie, usuwanie nieprzyjemnych zapachów</td>
								<td>150 zł</td>
								</tr>
								<tr>
								<td><a href="?strona=tunap" title="Dezynfekcja TUNAP">Dezynfekcja TUNAP</a>, odgrzybianie najskuteczniejszą, chemiczną metodą ręczną</td>
								<td>250 zł</td>
								</tr>
								</tbody></table>
								
								<h3>Zakres obsługi układu klimatyzacji:</h3>
								<ul class="default">
								<li>odzysk czynnika</li>
								<li>wykonanie próżni</li>
								<li>kontrola szczelności</li>
								<li>napełnienie czystym czynnikiem</li>
								<li>kontrola ciśnienia podczas pracy klimatyzacji</li>
								<li>kontrola wzrokowa oraz wydajnościowa układu klimatyzacji</li>
								<li><span>W razie potrzeby:</span>
									<ul class="default">
										<li>identyfikacja i analiza czynnika w układzie</li>
										<li>uzupełnienie ubytku czynnika chłodniczego</li>
										<li>uzupełnienie oleju</li>
										<li>podanie barwnika UV</li>
										<li>opłukanie skraplacza z kurzu</li>
									</ul>
								</li>
								</ul>								

								<h3>Obsługa układu klimatyzacji R134a:</h3>
								<p>(auta od 1993 r. do 2014 r. i niektóre po 2014 r.)</p>
								<table class="default">
								<tbody>
								<tr>
								<td>Serwis układu, uzupełnienie czynnika <strong>R134a</strong>, oleju, UV</td>
								<td>250 zł + 40 zł/100g powyżej 50g</td>
								</tr>
								</tbody></table>
													
								<h3>Obsługa układu klimatyzacji R1234yf:</h3>
								<p>(niektóre auta od 2014 r. i większość od 2017 r.)</p>
								<table class="default">
								<tbody>
								<tr>
								<td>Serwis układu, uzupełnienie czynnika <strong>R1234yf</strong>, oleju, UV</td>
								<td>300 zł + 10 zł/10 gram powyżej 50g</td>
								</tr>
								</tbody></table>

								<h3>Obsługa układu klimatyzacji R12:</h3>
								<p>(auta sprzed 1993 r.)</p>
								<table class="default">
								<tbody>
								<tr>
								<td>Serwis układu, uzupełnienie czynnika zamiennik za <strong>R12</strong>, oleju, UV</td>
								<td>300 zł + 40 zł/100g powyżej 50g</td>
								</tr>
								</tbody></table>
								
								<h3>Diagnostyka usterek:</h3>
								<table class="default">
								<tbody>
								<tr>
								<td>Diagnostyka komputerowa / Diagnostyka szczelności klimatyzacji</td>
								<td>250 zł</td>
								</tr>
								<tr>
								<td>Diagnostyka kompresora na hamowni</td>
								<td>250 zł</td>
								</tr>
								</tbody></table>

								<h3>Do poniższych usług należy doliczyć demontaż/montaż i napełnienie:</h3>
								<table class="default">
								<tbody>
								<tr>
								<td>Naprawa przewodu aluminiowego</td>
								<td>od 250 zł</td>
								</tr>
								<tr>
								<td>Naprawa przewodu aluminiowo-gumowego</td>
								<td>od 300 zł</td>
								</tr>
								<tr>
								<td>Regeneracja kompresora (uszczelnienie+regeneracja kpl. sprzęgła)</td>
								<td>od 1000 zł</td>
								</tr>
								<tr>
								<td>Płukanie układu klimatyzacji z opiłków i brudnego oleju po zatarciu kompresora</td>
								<td>od 1500 zł</td>
								</tr>
								</tbody></table>
								<h3>Robocizna</h3>
								<table class="default">
								<tbody>
								<tr>
								<td>Roboczogodzina</td>
								<td>250 zł</td>
								</tr>
								</tbody></table>
																
							</article>
							<a href="?strona=gwarancja" title="Gwarancja Klima-Kar" class="button icon fa-wrench">Gwarancja</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'gwarancja'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Gwarancja Klima-Kar</h2>								
								<ul class="default">
								<li>Części nowe - 24 miesiące</li>
								<li>Części regenerowane - 24 miesiące</li>
								</ul>
								<h3>Warunki gwarancji:</h3>
								<p>Jeżeli w ciągu 24 miesięcy od regeneracji lub wymiany zawiedzie część, której regeneracja lub wymiana dotyczyła, to gwarantujemy priorytetowe załatwianie sprawy. Klient gwarancyjny obsługiwany jest poza kolejnością i bez oczekiwania na rozpatrzenie gwarancji przez producenta. Producenci części zamiennych często oferują tylko 12 miesięcy gwarancji i potrafią rozpatrywać je przez długi czas, a u nas gwarancja to zawsze 24 miesiące. Przykładowo jeśli zakupiona i zamontowana u nas chłodnica rozszczelni się, to na nasz koszt montujemy nową bez oczekiwania na rozpatrzenie reklamacji u producenta.</p>
								<h3>Czy jeśli wymieniłem u Państwa sprężarkę klimatyzacji, a po miesiącu rozszczelniła się chłodnica klimatyzacji, to mogę liczyć na naprawę gwarancyjną?</h3>
								<p>Niestety nie. Gwarancja dotyczy wyłącznie części i podzespołów, które były zregenerowane lub wymienione.</p>
								<h3>Czy jeśli wykonali Państwo naprawę sprężarki - wymianę łożyska, a po pół roku sprężarka straciła wydajność, to mogę liczyć na naprawę gwarancyjną?</h3>
								<p>Niestety nie. Aby gwarancja dotyczyła całej sprężarki należy zdecydować się na kompleksową regenerację sprężarki. Naprawa sprężarki jest tańsza od regeneracji, ale gwarancja dotyczy tylko naprawionego podzespołu sprężarki.</p>
								<h3>Czy jeśli wykonali Państwo montaż dostarczonej przeze mnie części, to mogę liczyć na naprawę gwarancyjną?</h3>
								<p>Niestety nie. Gwarancja dotyczy tylko części zakupionych i zamontowanych w naszej firmie. Jeśli część dostarczona przez klienta ulegnie uszkodzeniu, to trzeba będzie pokryć koszt ponownego demontażu, montażu i ewentualnego napełnienia czynnikiem.</p>

							</article>
							<a href="?strona=cennik" title="Cennik Klima-Kar" class="button icon fa-list">Cennik</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}elseif($page == 'bg'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Dezynfekcja BG</h2>								
								
								<h3>Regularna dezynfekcja to podstawa</h3>
								
								<img class="image right" src="images/bg-przed.jpg" title="Źródło obrazu: BG Poland" alt="Przed dezynfekcją BG">
								<p>Jednym z kluczowych problemów związanych z prawidłowym funkcjonowaniem systemu klimatyzacji jest utrzymanie go w czystości, dlatego serwis powinien mieć charakter profilaktyczny. System wentylacji wdmuchuje ciepłe lub zimne powietrze do wnętrza pojazdu.
								Musi ono przejść przez parownik, gdzie nagromadzone zanieczyszczenia uniemożliwiają jego swobodny przepływ. Brud, pozostałości dymu papierosowego, pyłki etc. zatykają przestrzenie pomiędzy elementami parownika, co utrudnia przepływ powietrza przez system wentylacyjny. Ponadto kryjące się w systemie wentylacyjnym pleśnie, bakterie, zarodniki czy grzyby dostają się do kabiny pojazdu za każdym razem, gdy włączane jest ogrzewanie lub chłodzenie. Może to powodować u kierowcy i pasażerów alergie, astmę czy inne choroby dróg oddechowych. Nie należy zapominać, że oprócz samego układu klimatyzacji źródłem nieprzyjemnych zapachów może być również kabina pojazdu. Wilgoć zbierająca się pod dywanikami czy rozlane produkty spożywcze mogą stanowić doskonałą pożywkę dla mikroorganizmów.
								<img class="image left" src="images/bg-podczas.png" title="Źródło obrazu: BG Poland" alt="Podczas dezynfekcji BG">
								Wykonując serwis układu klimatyzacji profilaktycznie, mamy pewność, że powietrze w pojeździe będzie cały czas świeże i pozbawione wszelkich zanieczyszczeń i drobnoustrojów, które mogą być przyczyną groźnych chorób układu oddechowego. Podkreśla to chociażby Państwowy Zakład Higieny, który od kilku lat alarmuje, iż źle serwisowany układ wentylacji sprzyja rozwojowi chorób układu oddechowego. Również Światowa Organizacja Zdrowia (WHO) na opracowanej przez swoich ekspertów liście zagrożeń dla płuc umieściła m.in. zespoły chorobotwórcze związane z oddychaniem zanieczyszczonym, klimatyzowanym powietrzem.
								</p>								
								<h3>Dlaczego dezynfekcja BG?</h3>
								<img class="image right" src="images/bg-po.jpg" title="Źródło obrazu: BG Poland" alt="Po dezynfekcji BG">
								<p>
								Na rynku dostępnych jest szereg technologii, których celem jest dezynfekcja wybranych elementów, niekoniecznie działających kompleksowo na cały układ klimatyzacji wraz z wnętrzem pojazdu. Jak we wszystkich dziedzinach mamy wybór, dlatego warto zapoznać się z oferowanymi metodami i sprawdzić, czy po ich zastosowaniu powietrze w pojeździe będzie cały czas świeże i pozbawione wszelkich zanieczyszczeń i drobnoustrojów, które mogą być przyczyną groźnych chorób układu oddechowego. Metodą, która działa kompleksowo na cały układ klimatyzacji i wnętrze pojazdu, jest procedura oferowana przez firmę BG. Zastosowanie serwisu układu klimatyzacji BG oczyści cały układ oraz poprawi jego wydajność. Nieprzyjemne zapachy, grzyby, pleśń zostaną zlikwidowane, a wnętrze pojazdu odświeżone.</p>
								
								<p>Źródło: BG Poland</p>
								<h3>Cennik</h3>
								<img class="image fit" src="images/bg-cennik.jpg" title="Źródło obrazu: BG Poland" alt="BG cennik">

								

							</article>
							<a href="?strona=cennik" title="Cennik Klima-Kar" class="button icon fa-list">Cennik</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
			<?php
		}elseif($page == 'tunap'){
		?>
		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div id="content">

						<!-- Content -->
							<article>
							
								<h2>Dezynfekcja TUNAP</h2>								
								<img class="image right" src="images/tunap-child.webp" title="Źródło obrazu: Tunap Polska" alt="Tunap dziecko">
								<h3>Preparat do czyszczenia klimatyzacji Contra Sept 180</h3>
								<p>Nowoczesny, bezaldehydowy preparat do czyszczenia klimatyzacji kompleksowo zwalcza nieprzyjemne zapachy powstające z biegiem czasu na skutek gromadzenia się bakterii i grzybów. Zwycięzca testu na najskuteczniejszy preparat do czyszczenia układów klimatyzacji przeprowadzonego przez Niemiecki Instytut ds. Astmy i Alergii.</p>
								<p>Procedurę czyszczenia klimatyzacji metodą TUNAP można podsumować jako unikanie „dróg na skróty”. Jej kluczowym punktem jest dokładne wyczyszczenie parownika, który jest elementem układu, na którym gromadzi się najwięcej osadów, bakterii i grzybów. Czyszczenie chemiczne specjalnym środkiem jest tu połączone z myciem ciśnieniowym, które pozwala wypłukać cały brud i usunąć go z przewodów wentylacyjnych pojazdu. Układ zostaje także zabezpieczony, co na dłuższy czas tworzy barierę dla rozwoju kolejnych, szkodliwych dla zdrowia mikroorganizmów.</p>
								<img class="image right" src="images/tunap-mycie2.webp" title="Źródło obrazu: Tunap Polska" alt="Podczas dezynfekcji TUNAP">
								<ul class="default">
									<li>Szczególnie polecany do kompleksowego czyszczenia układów klimatyzacji;</li>
									<li>Do zwalczania nieprzyjemnych zapachów;</li>
									<li>Dopuszczony do użytku przez DGHM (Niemieckie Towarzystwo Higieny i Mikrobiologii);</li>
									<li>Szybko działający natryskowy preparat czyszczący na bazie alkoholu z właściwościami chroniącymi elementy wnętrza pojazdu.</li>
								</ul>
								<p>
									Bakterie, grzyby i mikroorganizmy osiedlające się w układzie klimatyzacji, mogą prowadzić do zanieczyszczenia powietrza w samochodzie. Firma TUNAP zaleca 1 do 2 razy w roku przeprowadzenie profesjonalnej dezynfekcji parownika oraz kanałów powietrznych używając preparatów do czyszczenia układów klimatyzacji najwyższej jakości. Preparat do czyszczenia klimatyzacji Conta Sept 180 pozwala usunąć przeszkadzające, nieprzyjemnie zapachy oraz zapobiec ponownemu osiedlaniu się bakterii, grzybów oraz mikroorganizmów na długi czas. Preparaty do czyszczenia klimatyzacji Contra Sept® są szczególnie polecane dla małych dzieci, alergików i astmatyków. Pozwól sobie swobodnie oddychać!
								</p>
								<img class="image fit" src="images/tunap-przedipo.webp" title="Źródło obrazu: Tunap Polska" alt="Tunap przed i po">
								<p>Źródło: tunap.pl, motofocus.pl</p>

							</article>
							<a href="?strona=cennik" title="Cennik Klima-Kar" class="button icon fa-list">Cennik</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt icon fa-question-circle">Jak dojechać?</a>
							<a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button icon fa-arrow-circle-right">Kontakt</a>
							
					</div>
				</div>
			</div>
		<?php
		}else{
		?>			
		<!-- Banner -->
			<div id="banner-wrapper">
				<div id="banner" class="box container">
					<div class="row">
						
						<?php
							include ("komunikat.html");
						?>
						
						<div class="7u 12u(medium)">
							<h2><span class="fa fa-phone fa-fw"></span><a href="tel:713371450">tel. 71 337 14 50</a>
							<br><span class="fa fa-mobile-phone fa-fw"></span><a href="tel:605594506">kom. 605 594 506</a></h2>
							<p>ul. Grota Roweckiego 129</p>
						</div>
							<div class="5u 12u(medium)">
								<ul>
									<li><a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button big icon fa-arrow-circle-right">Kontakt</a></li>
									<li><a href="?strona=kontakt" title="Kontakt Klima-Kar" class="button alt big icon fa-question-circle">Jak dojechać?</a></li>
								</ul>
							</div>	
						</div>
				</div>
			</div>
		
		<!-- Features -->
			<div id="features-wrapper">
				<div class="container">
					<div class="row">
						<div class="4u 12u(medium)">
						
							<!-- Box -->
								<section class="box feature">
									<a href="?strona=klimatyzacja-samochodowa" title="Klimatyzacje samochodowe" class="image featured"><img src="images/pic01.jpg" alt=""></a>
									<div class="inner">
										<header>
											<h2><a href="?strona=klimatyzacja-samochodowa" title="Klimatyzacje samochodowe">Klimatyzacje samochodowe</a></h2>
										</header>
										<p>Wykonujemy wszelkie naprawy takie jak: regeneracja sprężarek (kompresorów), naprawa przewodów, chłodnic klimatyzacji, wymiana parowników, usuwanie nieprzyjemnych zapachów, dezynfekcja, odgrzybianie, napełnianie.</p>
									</div>
								</section>

						</div>
						<div class="4u 12u(medium)">
						
							<!-- Box -->
								<section class="box feature">
									<a href="?strona=ogrzewanie-postojowe" title="Ogrzewania postojowe" class="image featured"><img src="images/webastoeber.png" alt="Webasto i Eberspächer"></a>
									<div class="inner">
										<header>
											<h2><a href="?strona=ogrzewanie-postojowe" title="Ogrzewania postojowe">Webasto i Eberspächer</a></h2>
											<p>Niezależne ogrzewania postojowe</p>
										</header>
										<p>Jesteśmy autoryzowanym serwisem Webasto i Eberspächer. Nasze wieloletnie doświadczenie i wiedza pozwalają na wykonywanie profesjonalnych napraw<br>i montaży nowych instalacji.</p>
									</div>
								</section>

						</div>
						<div class="4u 12u(medium)">
						
							<!-- Box -->
								<section class="box feature last">
									<a href="?strona=defa" title="DEFA" class="image featured"><img src="images/defa.png" alt="DEFA"></a>
									<div class="inner">
										<header>
											<h2><a href="?strona=defa" title="Ogrzewanie DEFA">DEFA</a></h2>
											<p>Elektryczne ogrzewanie postojowe</p>
										</header>
										<p>Polecamy osobom posiadającym dostęp do sieci elektrycznej w miejscu postoju. DEFA pozwala ogrzać wnętrze pojazdu<br>i silnik, a także naładować akumulator. Oferujemy doradztwo i montaż.</p>
									</div>
								</section>

						</div>
					</div>
				</div>
			</div>

		<!-- Main -->
			<div id="main-wrapper">
				<div class="container">
					<div class="row 200%">
						<div class="4u 12u(medium)">
						
							<!-- Sidebar -->
								<div id="sidebar">
									<section class="widget thumbnails">
										<h3><a href="?strona=galeria" title="Galeria zdjęć">Galeria zdjęć</a></h3>
										<div class="grid">
											<div class="row 50%">
												<div class="6u"><a href="?strona=galeria" class="image fit"><img src="images/galeria/war.JPG" alt="warsztat"></a></div>
												<div class="6u"><a href="?strona=galeria" class="image fit"><img src="images/galeria/lamb.JPG" alt="serwis Lamborghini"></a></div>
												<div class="6u"><a href="?strona=galeria" class="image fit"><img src="images/galeria/k2.jpg" alt="kompresor"></a></div>
												<div class="6u"><a href="?strona=galeria" class="image fit"><img src="images/galeria/szyld.JPG" alt="szyld"></a></div>
											</div>
										</div>
										<a href="?strona=galeria" title="Galeria Klima-Kar" class="button icon fa-picture-o">Więcej</a>
									</section>
								</div>
						
						</div>
						<div class="8u 12u(medium) important(medium)">

							<!-- Content -->
								<div id="content">
									<section class="last">
										<h2><a href="?strona=o-firmie" title="O firmie">Dlaczego my?</a></h2>
										<p>
										Zaufaj ekspertom z wieloletnim doświadczeniem! W Klima-Kar specjalizujemy się nie tylko w <strong><a href="?strona=klimatyzacja-samochodowa" title="Klimatyzacje samochodowe">klimatyzacjach samochodowych</a></strong>, ale także w profesjonalnym serwisie ogrzewania postojowego marek <strong><a href="?strona=ogrzewanie-postojowe" title="Ogrzewanie postojowe Webasto">Webasto</a></strong>, <strong><a href="?strona=ogrzewanie-postojowe" title="Ogrzewanie postojowe Eberspächer">Eberspächer</a></strong> i <strong><a href="?strona=defa" title="Ogrzewanie DEFA">DEFA</a></strong>. Nasza wiedza, poparta tysiącami udanych napraw i serwisów, to Twoja gwarancja trafnej diagnozy i skutecznego rozwiązania problemu. Dbamy o Twój komfort i czas – dlatego popularne części zamiennie i filtry kabinowe mamy dostępne od ręki. Wybierając nas, masz pewność, że Twoim autem zajmą się wykwalifikowani specjaliści.
										</p>

										<a href="?strona=o-firmie" title="O firmie" class="button icon fa-arrow-circle-right">Więcej informacji</a>
										<a href="?strona=gwarancja" title="Gwarancja Klima-Kar" class="button alt icon fa-wrench">Gwarancja</a>
									</section>
								</div>

						</div>
					</div>
				</div>
			</div>
			
	<?php } ?>

	
		<!-- Footer -->
		
			<div id="footer-wrapper">
				<footer id="footer" class="container">
					<div class="row">
						<div class="3u 6u(medium) 12u$(small)">
						
							<!-- Links -->
								<section class="widget links">
									<h3>Godziny otwarcia</h3>
									<ul class="style2">
										<li><strong>pon.-pt. od 9<sup>00</sup> do 17<sup>00</sup></strong></li>
										<li><strong>sobota nieczynne<!-- od 9<sup>00</sup> do 12<sup>00</sup>--></strong></li>
									</ul>
								</section>
						
						</div>
						<div class="3u 6u$(medium) 12u$(small)">
						
							<!-- Contact -->
								<section class="widget contact last">
									<h3>Kontakt</h3>
									<ul>
										<li><a href="mailto:serwis@klima-kar.pl" class="icon fa-envelope"><span class="label">e-mail Klima-Kar</span></a></li>
										<li><a href="https://www.facebook.com/KlimaKar" class="icon fa-facebook"><span class="label">Facebook Klima-Kar</span></a></li>
									</ul>
									<p>Grota Roweckiego 129<br>
									Wrocław, 52-214<br>
									<strong><a href="tel:713371450">tel. 71 337 14 50</a><br>
											<a href="tel:605594506">kom. 605 594 506</a></strong></p>
								</section>
						
						</div>
						<div class="3u 6u(medium) 12u$(small)">
						
							<!-- Links -->
								<section class="widget links">
									<h3>Menu</h3>
									<ul class="style2">
										<li><a href="/" title="Strona główna">Strona główna</a></li>
										<li><a href="?strona=klimatyzacja-samochodowa" title="Klimatyzacje samochodowe">Klimatyzacja samochodowa</a></li>
										<li><a href="?strona=konserwacja" title="Konserwacja klimatyzacji">Konserwacja klimatyzacji</a></li>
										<li><a href="?strona=ogrzewanie-postojowe" title="Ogrzewania postojowe">Ogrzewania postojowe</a></li>
										<li><a href="?strona=defa" title="DEFA">Ogrzewanie DEFA</a></li>
										<li><a href="?strona=cennik" title="Cennik Klima-Kar">Cennik</a></li>
										<li><a href="?strona=gwarancja" title="Gwarancja Klima-Kar">Gwarancja</a></li>
										
									</ul>
								</section>
						
						</div>
						<div class="3u 6u$(medium) 12u$(small)">
						
							<!-- Links -->
								<section class="widget links">
									<ul class="style2">
										<li><a href="?strona=kontakt" title="Kontakt Klima-Kar">Kontakt i dojazd</a></li>
										<li><a href="?strona=webasto" title="Webasto Wrocław">Webasto</a></li>
										<li><a href="?strona=eberspacher" title="Eberspächer Wrocław">Eberspächer</a></li>
										<li><a href="?strona=bg" title="Dezynfekcja BG Klima-Kar">Dezynfekcja BG</a></li>
										<li><a href="?strona=tunap" title="TUNAP Klima-Kar">Dezynfekcja TUNAP</a></li>
										<li><a href="?strona=o-firmie" title="O firmie Klima-Kar">O firmie</a></li>
										<li><a href="?strona=galeria" title="Galeria Klima-Kar">Galeria zdjęć</a></li>
										<li><a href="https://www.facebook.com/KlimaKar" title="Facebook Klima-Kar">Facebook fanpage</a></li>										
										<li><a href="?strona=rodo" title="RODO">Ochrona danych (RODO)</a></li>
									</ul>
								</section>
						
						</div>
					</div>
					
					<div class="row">
						<div class="12u">
							<div id="copyright">
								<ul class="menu">
									<li>&copy; Klima-Kar. All rights reserved</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
								</ul>
							</div>
						</div>
					</div>
				</footer>
			</div>
			
		<!-- Scripts -->

			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.dropotron.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
			<script src="assets/js/main.js"></script>
	</body>
</html>