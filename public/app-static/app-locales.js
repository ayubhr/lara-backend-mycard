/* @source http://purl.eligrey.com/github/l10n.js/blob/master/l10n.js*/
(function() {
    var z = "undefined",
        x = "string",
        s = self.navigator,
        w = String,
        k = Object.prototype.hasOwnProperty,
        o = {},
        q = {},
        j = !1,
        y = !0,
        m = /^\s*application\/(?:vnd\.oftn\.|x-)?l10n\+json\s*(?:$|;)/i,
        B, b = "locale",
        a = "defaultLocale",
        c = "toLocaleString",
        d = "toLowerCase",
        e = Array.prototype.indexOf || function(D) {
            var E = this.length,
                C = 0;
            for (; C < E; C++) {
                if (C in this && this[C] === D) {
                    return C
                }
            }
            return -1
        },
        v = function(C) {
            var i = new B();
            i.open("GET", C, j);
            i.send(null);
            if (i.status !== 200) {
                setTimeout(function() {
                    var D = new Error("Unable to load localization data: " + C);
                    D.name = "Localization Error";
                    throw D
                }, 0);
                return {}
            } else {
                return JSON.parse(i.responseText)
            }
        },
        n = w[c] = function(i) {
            if (arguments.length > 0 && typeof i !== "number") {
                if (typeof i === x) {
                    n(v(i))
                } else {
                    if (i === j) {
                        q = {}
                    } else {
                        var C, D, E;
                        for (C in i) {
                            if (k.call(i, C)) {
                                D = i[C];
                                C = C[d]();
                                if (!(C in q) || D === j) {
                                    q[C] = {}
                                }
                                if (D === j) {
                                    continue
                                }
                                if (typeof D === x) {
                                    if (w[b][d]().indexOf(C) === 0) {
                                        D = v(D)
                                    } else {
                                        if (!(C in o)) {
                                            o[C] = []
                                        }
                                        o[C].push(D);
                                        continue
                                    }
                                }
                                for (E in D) {
                                    if (k.call(D, E)) {
                                        q[C][E] = D[E]
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return Function.prototype[c].apply(w, arguments)
        },
        t = function(E) {
            var G = o[E],
                C = 0,
                D = G.length,
                F;
            for (; C < D; C++) {
                F = {};
                F[E] = v(G[C]);
                n(F)
            }
            delete o[E]
        },
        A, r = w.prototype[c] = function() {
            if (typeof this === z) {
                return this
            }
            var H = A,
                C = w[H ? a : b],
                F = C[d]().split("-"),
                D = F.length,
                G = this.valueOf(),
                E;
            A = j;
            do {
                E = F.slice(0, D).join("-");
                if (E in o) {
                    t(E)
                }
                if (E in q && G in q[E]) {
                    return q[E][G]
                }
            } while (D-- > 1);
            if (!H && w[a]) {
                A = y;
                return r.call(G)
            }
            return G
        };
    if (typeof XMLHttpRequest === z && typeof ActiveXObject !== z) {
        var f = ActiveXObject;
        B = function() {
            try {
                return new f("Msxml2.XMLHTTP.6.0")
            } catch (i) {}
            try {
                return new f("Msxml2.XMLHTTP.3.0")
            } catch (C) {}
            try {
                return new f("Msxml2.XMLHTTP")
            } catch (D) {}
            throw new Error("XMLHttpRequest not supported by this browser.")
        }
    } else {
        B = XMLHttpRequest
    }
    w[a] = w[a] || "";
    w[b] = s && (s.language || s.userLanguage) || "";
    if (typeof document !== z) {
        var h = document.getElementsByTagName("link"),
            l = h.length,
            p;
        while (l--) {
            var g = h[l],
                u = (g.getAttribute("rel") || "")[d]().split(/\s+/);
            if (m.test(g.type)) {
                if (e.call(u, "localizations") !== -1) {
                    n(g.getAttribute("href"))
                } else {
                    if (e.call(u, "localization") !== -1) {
                        p = {};
                        p[(g.getAttribute("hreflang") || "")[d]()] = g.getAttribute("href");
                        n(p)
                    }
                }
            }
        }
    }
}());
String.toLocaleString({
    "en-US": {
        "%inputHint.username": "Requirements for valid username:<br />- at least 5, at most 20 characters<br />- can contain lowercase letters (a-z), uppercase letters (A-Z), numbers (0-9), special characters - and _<br />- cannot contain spaces</br>- must be available, i.e. not assigned to a previously registered user",
        "%inputHint.pswd": "Requirements for valid password:<br />- must consist of at least 5, at most 40 characters<br />- can contain lowercase letters (a-z), uppercase letters (A-Z), numbers (0-9) and special characters<br />- allowed special characters: !#$()@?{}|*+^.,-+&=%_:;~<br />- cannot contain spaces",
        "%till.btnAbort": "Cancel",
        "%till.btnConfirm": "Confirm",
        "%mobileAdmin.backBtn": "Back",
        "%mobileAdmin.search": "Search",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "To add this web app to the home screen: click %ICON_ADD% and then <b>Add to Home Screen</b>",
        "%mobileAdmin.msgErrorServiceCall": "We apologize, an unexpected error has occurred while processing your request. Please try again",
        "%pageNotFound.title": "Page Not Found",
        "%pageNotFound.msg": "The page you are trying to access has not been found",
        "%pageNotFound.contact": "If you need help or have any questions, you can contact our user support team",
        "%pageNotFound.back": "Back to home page",
        "%validation.sDateGreather": "Start date is greather than end date",
        "%csButton.cancel": "Cancel",
        "%csButton.yes": "Yes",
        "%csButton.removeAll": "Remove all",
        "%csButton.close": "Close",
        "%csButton.reload": "Reload",
        "%bsSubmit.title": "Submit?",
        "%bsSubmit.confirm": "Are you sure you want to submit created betslip?"
    },
    "hr-HR": {
        "%inputHint.username": "Uvjeti za valjano korisničko ime:<br />- najmanje 5, najviše 20 znakova<br />- može sadržavati mala (a-z), velika slova (A-Z), brojeve (0-9), specijalne znakove - i _<br />- ne može imati razmake<br />- mora biti raspoloživo, tj. nije dodijeljeno nijednom prethodno registriranom korisniku",
        "%inputHint.pswd": "Uvjeti za valjanu lozinku:<br />- mora se sastojati od najmanje 5, najviše 40 znakova<br />- može sadržavati mala (a-z), velika slova (A-Z), brojeve (0-9) i specijalne znakove<br />- dozvoljeni specijalni znakovi: !#$()@?{}|*+,^.-+&=%_:;~<br />- ne može sadržavati razmake",
        "%till.btnAbort": "Prekini",
        "%till.btnConfirm": "Potvrdite",
        "%mobileAdmin.backBtn": "Nazad",
        "%mobileAdmin.search": "Pretraživanje",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "Da biste dodali ovu web aplikaciju na početni zaslon: kliknite %ICON_ADD%, a zatim <b> Dodaj na početni zaslon </b>",
        "%mobileAdmin.msgErrorServiceCall": "Ispričavamo se, došlo je do neočekivane greške prilikom obrade Vašeg zahtjeva. Molimo pokušajte ponovo",
        "%pageNotFound.title": "Stranica nije pronađena",
        "%pageNotFound.msg": "Web stranica kojoj ste pokušali pristupiti nije pronađena.",
        "%pageNotFound.contact": "Ako vam je potreba pomoć ili imate pitanje, možete se obratiti našem timu za korisničku podršku",
        "%pageNotFound.back": "Natrag na početnu stranicu",
        "%validation.sDateGreather": "Datum početka je veći od datuma završetka",
        "%csButton.cancel": "Otkaži",
        "%csButton.yes": "Da",
        "%csButton.removeAll": "Obriši sve",
        "%csButton.close": "Zatvori",
        "%csButton.reload": "Ponovno učitaj",
        "%bsSubmit.title": "Uplata listića",
        "%bsSubmit.confirm": "Jeste li sigurni da želite uplatiti kreirani listić?"
    },
    "de-DE": {
        "%inputHint.username": "Bedingungen für einen gültigen Benutzernamen:<br />- minimal 5, maximal 20 Zeichen<br />- kann Klein- (a-z) oder Großbuchstaben (A-Z), Zahlen (0-9), Sonderzeichen - und _ enthalten<br />- keine Leerzeichen (Spaces)<br />- muss verfügbar sein, d.h. nicht schon an einen anderen registrierten Benutzer vergeben",
        "%inputHint.pswd": "Bedingungen für ein gültiges Passwort:<br />- minimal 5, maximal 40 Zeichen<br />- kann Klein- (a-z) oder Großbuchstaben (A-Z), Zahlen (0-9) und Sonderzeichen enthalten<br />- erlaubte Sonderzeichen: !#$()@?{}|*+,^.-+&=%_:;~<br />- keine Leerzeichen (Spaces)",
        "%till.btnAbort": "Abbrechen",
        "%till.btnConfirm": "Bestätige",
        "%mobileAdmin.backBtn": "Zurück",
        "%mobileAdmin.search": "Suche",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "Um diese Web-App auf den Home-Bildschirm hinzuzufügen: Klicken Sie auf %ICON_ADD% und dann auf <b> Zum Home-Bildschirm hinzufügen </b>",
        "%mobileAdmin.msgErrorServiceCall": "Entschuldigung, unerwarteter Fehler bei der Bearbeitung Ihres Antrags. Versuchen Sie erneut",
        "%pageNotFound.title": "Seite nicht gefunden",
        "%pageNotFound.msg": "Die gesuchte Seite wurde nicht gefunden.",
        "%pageNotFound.contact": "Wenn Sie Hilfe brauchen oder eine Frage haben, wenden Sie sich gerne hier an unser Kundendienst-Team",
        "%pageNotFound.back": "Zurück zur Startseite",
        "%validation.sDateGreather": "Anfangsdatum ist größer als Enddatum.",
        "%csButton.cancel": "Abbrechen",
        "%csButton.yes": "Ja",
        "%csButton.removeAll": "Alles löschen",
        "%csButton.close": "Schließen",
        "%csButton.reload": "Neu laden",
        "%bsSubmit.title": "Bestätigung",
        "%bsSubmit.confirm": "Wettschein abgeben?"
    },
    "fr-FR": {
        "%inputHint.username": "Les conditions pour un nom d'utilisateur valide:<br />- au moins 5, au maximum 20 signes<br />- il peut contenir des minuscules (a-z), majuscules (A-Z), chiffres (0-9), de signes spéciaux - et _<br />- ne peut pas être des espaces laisses libres<br />- doit être disponible c'est-à-dire il ne doit pas être déjà attribué à un autre utilisateur",
        "%inputHint.pswd": "Conditions pour un mot de passe valable:<br />- doit contenir au moins 5 signes et 40 signes au maximum<br />- il peut contenir des minuscules (a-z), majuscules (A-Z), chiffres (0-9) et signes spéciaux<br />- signes spéciaux permis: !#$()@?{}|*+,^.-+&=%_:;~<br />- il ne peut pas contenir des espaces laissés libres",
        "%till.btnAbort": "Cancel",
        "%till.btnConfirm": "Confirm",
        "%mobileAdmin.backBtn": "En arrière",
        "%mobileAdmin.search": "Recherche",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "To add this web app to the home screen: click %ICON_ADD% and then <b>Add to Home Screen</b>",
        "%mobileAdmin.msgErrorServiceCall": "Nous nous excusons, une erreur inattendue est survenue lors de l'élaboration de votre demande. Veuillez essayer encore une fois",
        "%pageNotFound.title": "Page non trouvée",
        "%pageNotFound.msg": "La page à laquelle vous essayez accéder sur cette adresse n'est pas trouvée.",
        "%pageNotFound.contact": "Si vous avez besoin d'assistance ou vous avez une question, vous pouvez contacter notre team d'assistance aux utilisateurs ici",
        "%pageNotFound.back": "Retour à la page initiale",
        "%validation.sDateGreather": "Start date is greather than end date",
        "%csButton.cancel": "Annuler",
        "%csButton.yes": "Oui",
        "%csButton.removeAll": "Effacer tout",
        "%csButton.close": "Fermer",
        "%csButton.reload": "Reload",
        "%bsSubmit.title": "Confirmation",
        "%bsSubmit.confirm": "Transmettre la fiche web?"
    },
    "it-IT": {
        "%inputHint.username": "Requisiti per nome utente valido:<br />- deve avere min. 5 e max. 20 caratteri<br />- potrà contenere lettere minuscole (a-z), maiuscole (A-Z), numeri (0-9), caratteri speciali - e _<br />- non potrà contenere spazi<br />- oltre a essere disponibile (cioè non deve essere stato precedentemente assegnato ad alcun altro utente registrato)",
        "%inputHint.pswd": "Requisiti per la password valida:<br />- deve contenere almeno 5 e massimo 40 caratteri<br />- potrà contenere lettere minuscole (a-z), maiuscole (A-Z), numeri (0-9) e caratteri speciali<br />- caratteri speciali consentiti: !#$()@?{}|*+,^.-+&=%_:;~<br />- non potrà contenere spazi",
        "%till.btnAbort": "Interrompi",
        "%till.btnConfirm": "Conferma",
        "%mobileAdmin.backBtn": "Indietro",
        "%mobileAdmin.search": "Ricerca",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "To add this web app to the home screen: click %ICON_ADD% and then <b>Add to Home Screen</b>",
        "%mobileAdmin.msgErrorServiceCall": "Siamo spiacenti, si è verificato un errore inatteso durante l'elaborazione della Sua richiesta. La preghiamo di riprovare",
        "%pageNotFound.title": "Pagina non trovata",
        "%pageNotFound.msg": "La pagina a cui cerca di accedere in questo indirizzo non è stata trovata.",
        "%pageNotFound.contact": "Se ha bisogno di aiuto o ha qualche domanda da porci, potrà rivolgersi al nostro team del Servizio clienti qui",
        "%pageNotFound.back": "Indietro per andare alla pagina iniziale",
        "%validation.sDateGreather": "La data dell’inizio è superiore alla data della fine",
        "%csButton.cancel": "Revoca",
        "%csButton.yes": "Si",
        "%csButton.removeAll": "Cancella tutto",
        "%csButton.close": "Chiudi",
        "%csButton.reload": "Reload",
        "%bsSubmit.title": "Conferma",
        "%bsSubmit.confirm": "Desidera consegnare la schedina web?"
    },
    "sq-AL": {
        "%inputHint.username": "Kriteret per nje emer perdorimi te vlefshem:<br />- se paku 5 shenja, me te shumten 20shenja<br />- mund te permbaje shkronja te vogla (a-z), shkronja te medhaja (A-Z), numra (0-9), shenja speciale - dhe _<br />- nuk mund te kete hapesira<br />- duhet te jete i disponueshem, gjithashtu nuk duhet ti jete i ndare dikujt tjeter ose ndonje perdoruesi tjeter te rregjistruar",
        "%inputHint.pswd": "Kriteret per fjalekalim te vlefshem:<br />- duhet te perbehet me jo me pak se 5 shenje, dhe jo me shume se 40 shenja<br />- mund te permbaje shkronja te vogla (a-z), shkronja te medhaja (A-Z), numra (0-9) dhe shenja speciale<br />- shenjat e vecanta te lejuara jane: !#$()@?{}|*+,^. -+&=%_:;~<br />- nuk mund te permbaje hapesira",
        "%till.btnAbort": "Cancel",
        "%till.btnConfirm": "Confirm",
        "%mobileAdmin.backBtn": "Mbrapa",
        "%mobileAdmin.search": "Kerkime",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "To add this web app to the home screen: click %ICON_ADD% and then <b>Add to Home Screen</b>",
        "%mobileAdmin.msgErrorServiceCall": "Ju kerkojme te falur, ka ndodhur nje gabim i papritur gjate perpunimit te kerkeses tuaj. Ju lutemi perpiquni me vone perseri",
        "%pageNotFound.title": "Faqja nuk eshte gjetur",
        "%pageNotFound.msg": "Faqja te cilen perpiqeni te lajmeroheni ne kete adrese nuk eshte gjetur.",
        "%pageNotFound.contact": "Nese keni nevoje per ndihme ose keni pyetje, mund ti beni grupit tone per perkrahjen e perdoruesit ketu",
        "%pageNotFound.back": "Mbrapa tek faqja fillestare",
        "%validation.sDateGreather": "Start date is greather than end date",
        "%csButton.cancel": "Hiqe",
        "%csButton.yes": "Që",
        "%csButton.removeAll": "Fshiji te gjitha",
        "%csButton.close": "Mbylli",
        "%csButton.reload": "Reload",
        "%bsSubmit.title": "Vërtetim",
        "%bsSubmit.confirm": "A dorezoni fleten web?"
    },
    "tr-TR": {
        "%inputHint.username": "Geçerli kullanıcı şartları:<br />- en aşağı 5, en fazla 20 işaret<br />- (a-z) küçük harfler, (A-Z) büyük harfler, (0-9) rakamlar, özel işaretler içerebilir - ve _ espas (spaces) içeremez<br />- ve kullanilabilir (sağlanabilir) yani herhangi başka bir kayıt tescil edilmiş kullanıcıya verilmemiş olmalıdır",
        "%inputHint.pswd": "Geçerli şifre için şartlar:<br />- en aşağı 5, en fazla 40 işaret<br />- (a-z) küçük harfler, (A-Z) büyük harfler, (0-9) rakamlar ve özel işaretler içerebilir<br />- izin verilmiş özel işaretler: !#$()@?{}|*+,^.-+&=%_:;~ içermelidir<br />- espasları (spaces) içermemektedir",
        "%till.btnAbort": "Iptal etme",
        "%till.btnConfirm": "Onayı",
        "%mobileAdmin.backBtn": "Geri",
        "%mobileAdmin.search": "Arama",
        "%mobileAdmin.iPrivateBrowsing": "Please disable Private Mode to access the site and then Reload Page",
        "%mobileAdmin.iAddToHome": "To add this web app to the home screen: click %ICON_ADD% and then <b>Add to Home Screen</b>",
        "%mobileAdmin.msgErrorServiceCall": "İsteminizin işlemi sırasında beklenmeyen yanlışlık meydana geldiği için kusuru bakmayınız. Lütfen tekrar deneyiniz",
        "%pageNotFound.title": "Sayfa bulunamamıştır",
        "%pageNotFound.msg": "Bu adreste giriş yapmaya çalıştığınız sayfa bulunamamıştır.",
        "%pageNotFound.contact": "Yardıma ihtiyaç veya sorunuz var ise burada bizim kullanıcı destek timimize başvurabilirsiniz",
        "%pageNotFound.back": "Başlangıç sayfasına geri dönüş",
        "%validation.sDateGreather": "Start date is greather than end date",
        "%csButton.cancel": "İptal et",
        "%csButton.yes": "Evet",
        "%csButton.removeAll": "Hepsini siliniz",
        "%csButton.close": "Kapat",
        "%csButton.reload": "Reload",
        "%bsSubmit.title": "Onay",
        "%bsSubmit.confirm": "Web kuponu teslim etmek?"
    },
    "es-ES": {
        "%inputHint.username": "Requisitos para el nombre de usuario válido:<br />- al menos 5, como máximo 20 caracteres<br />- puede contener letras minúsculas (a-z), letras mayúsculas (A-Z), números (0-9), caracteres especiales - y_<br />- no puede contener espacios</br>- debe estar disponible, es decir, no asignado a un usuario registrado anteriormente",
        "%inputHint.pswd": "Requisitos para la contraseña válida:<br />- debe consistir de al menos 5, como máximo 40 caracteres<br />- puede contener letras minúsculas (a-z), letras mayúsculas (A-Z), números (0-9) y caracteres especiales<br />- caracteres especiales permitios: !#$()?{}|*+,^.-+&=%_:;~@<br />- no puede contener espacios",
        "%till.btnAbort": "Cancelar",
        "%till.btnConfirm": "Confirmar",
        "%mobileAdmin.backBtn": "Volver",
        "%mobileAdmin.search": "Buscar",
        "%mobileAdmin.iPrivateBrowsing": "Por favor desactive navegar privado para acceder al sitio y recargar la pagina",
        "%mobileAdmin.iAddToHome": "Para añadir esta web app a su pantalla de inicio: haga clic %ICON_ADD% y entonces <b>Añadir a pantalla de inico</b>",
        "%mobileAdmin.msgErrorServiceCall": "Nos disculpamos, se ha producido un error inesperado al procesar su solicitud. Por favor, inténtelo de nuevo",
        "%pageNotFound.title": "Pagina sin encontrar",
        "%pageNotFound.msg": "La pagina requerida no se encuentra",
        "%pageNotFound.contact": "Si ncesita ayuda o tiene preguntas, puede contactar con nuestro equipo de soprorte",
        "%pageNotFound.back": "Volver a la página de inicio",
        "%validation.sDateGreather": "Fecha de inicio inferior a fecha de fin",
        "%csButton.cancel": "Cancelar",
        "%csButton.yes": "Sí",
        "%csButton.removeAll": "Eliminar todo",
        "%csButton.close": "Cerrar",
        "%csButton.reload": "Recargar",
        "%bsSubmit.title": "Confirmación",
        "%bsSubmit.confirm": "Esta seguro que quiere presentar el ticket de apuestas creado?"
    }
});

