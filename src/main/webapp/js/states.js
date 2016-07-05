function States($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/home/home.html',
                    controller: 'HomeCtlr'
                }
            }
        })
        .state('home.zugang', {
            url: '/zugang',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/zugang.html',
                    controller: 'ZugangCtrl'
                }
            }
        })
        .state('home.zugang.passwortAendern', {
            url: '/changePassword',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/passwortAendern.html',
                    controller: 'PasswortAendernCtlr'
                }
            }
        })
        .state('home.zugang.passwortAendern.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/passwortAendern.html',
                    controller: 'PasswortAendernCtlr'
                }
            }
        })
        .state('home.zugang.pushTan', {
            url: '/pushTan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/pushTanAktivieren.html',
                    controller: 'PushTanAktivierenCtlr'
                }
            }
        })
        .state('home.zugang.pushTan.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/pushTanAktivieren.html',
                    controller: 'PushTanAktivierenCtlr'
                }
            }
        })
        .state('home.zugang.login', {
            url: '/login',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/loginAendern.html',
                    controller: 'LoginAendernCtrl'
                }
            }
        })
        .state('home.zugang.login.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/loginAendern.html',
                    controller: 'LoginAendernCtrl'
                }
            }
        })
        .state('home.zugang.konten', {
            url: '/konten',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/kontenZusammenfuehren.html',
                    controller: 'KontenZusammenfuehrenCtrl'
                }
            }
        })
        .state('home.zugang.konten.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/kontenZusammenfuehren.html',
                    controller: 'KontenZusammenfuehrenCtrl'
                }
            }
        })
        .state('home.zugang.loeschen', {
            url: '/loeschen',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/kontoLoeschen.html',
                    controller: 'KontoLoeschenCtrl'
                }
            }
        })
        .state('home.zugang.loeschen.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/zugang/kontoLoeschen.html',
                    controller: 'KontoLoeschenCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten', {
            url: '/persoenlicheDaten',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDaten.html',
                    controller: 'PersoenlicheDatenCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.adresse', {
            url: '/adresse',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/adresse.html',
                    controller: 'AdresseCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.adresse.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/adresse.html',
                    controller: 'AdresseCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.zustellung', {
            url: '/zustellung',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/zustellung.html',
                    controller: 'ZustellungCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.zustellung.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/zustellung.html',
                    controller: 'ZustellungCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.einwilligung', {
            url: '/einwilligung',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/einwilligung.html',
                    controller: 'EinwilligungCtrl'
                }
            }
        })
        .state('home.persoenlicheDaten.einwilligung.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/einwilligung.html',
                    controller: 'EinwilligungCtrl'
                }
            }
        })
        .state('home.vertraege', {
            url: '/vertraege',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/vertraege/vertraege.html',
                    controller: 'VertraegeCtrl'
                }
            }
        })
        .state('home.vertraege.freischalten', {
            url: '/freischalten',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/vertraege/vertragFreischalten.html',
                    controller: 'VertragFreischaltenCtrl'
                }
            }
        })
        .state('home.vertraege.freischalten.tan', {
            url: '/tan',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/vertraege/vertragFreischaltenTan.html',
                    controller: 'VertragFreischaltenTanCtrl'
                }
            }
        })
        .state('home.vertraege.suche', {
            url: '/suche',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/vertraege/vertragSuche.html',
                    controller: 'VertragSucheCtrl'
                }
            }
        })
		.state('validateEmailConfirmCode', {
            url: '/validateEmailConfirmCode',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/comminfo/validateEmailConfirmCode.html',
                    controller: 'ValidateEmailConfirmCodeCtlr'
                }
            }
        })
		.state('validateMobilePhone', {
            url: '/validateMobilePhone',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/comminfo/validateMobilePhone.html',
                    controller: 'ValidateMobilePhoneCtlr'
                }
            }
        })
        .state('eakVerknuepfenVnrEingabe', {
            url: '/eakVerknuepfenVnrEingabe',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/eakVerknuepfen/vnrEingabe.html',
                    controller: 'EakVerknuepfenVnrEingabeCtlr'
                }
            }
        })
        .state('eakVerknuepfenPostAddresseErfassen', {
            url: '/eakVerknuepfenPostAddresseErfassen',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/eakVerknuepfen/postAddresseErfassen.html',
                    controller: 'EakVerknuepfenPostAddresseErfassenCtlr'
                }
            }
        })
        .state('eakVerknuepfenTransportWaehlen', {
            url: '/eakVerknuepfenTransportWaehlen',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/eakVerknuepfen/transportWaehlen.html',
                    controller: 'EakVerknuepfenTransportWaehlenCtlr'
                }
            }
        })
        .state('eakVerknuepfenCodeEingeben', {
            url: '/eakVerknuepfenCodeEingeben',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/eakVerknuepfen/codeEingeben.html',
                    controller: 'EakVerknuepfenCodeEingebenCtrl'
                }
            }
        })
        .state('meineVertraegeVertragsUebersicht', {
            url: '/meineVertraegeVertragsUebersicht',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/meineVertraege/vertragsUebersicht.html',
                    controller: 'MeineVertraegeVertragsUebersichtCtrl'
                }
            }
        })
        .state('persoenlicheDaten', {
            url: '/persoenlicheDaten',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDaten.html',
                    controller: 'PersoenlicheDatenCtrl'
                }
            }
        })
        .state('persoenlicheDatenEdit', {
            url: '/persoenlicheDatenEdit',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDatenEdit.html',
                    controller: 'PersoenlicheDatenEditCtrl'
                }
            }
        })
        .state('persoenlicheDatenSubmit', {
            url: '/persoenlicheDatenSubmit',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDatenSubmit.html',
                    controller: 'PersoenlicheDatenSubmitCtrl'
                }
            }
        })
        .state('persoenlicheDatenFinish', {
            url: '/persoenlicheDatenFinish',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDatenFinish.html',
                    controller: 'PersoenlicheDatenFinishCtrl'
                }
            }
        })
        .state('persoenlicheDatenVerifyEmail', {
            url: '/persoenlicheDatenVerifyEmail',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDatenVerifyEmail.html',
                    controller: 'PersoenlicheDatenVerifyEmailCtrl'
                }
            }
        })
        .state('persoenlicheDatenVerifyMobile', {
            url: '/persoenlicheDatenVerifyMobile',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/persoenlicheDatenVerifyMobile.html',
                    controller: 'PersoenlicheDatenVerifyMobileCtrl'
                }
            }
        })
        .state('zustimmung', {
            url: '/zustimmung',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/zustimmung.html',
                    controller: 'ZustimmungCtrl'
                }
            }
        })
        .state('zustimmungEdit', {
            url: '/zustimmungEdit',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/persoenlicheDaten/zustimmungEdit.html',
                    controller: 'ZustimmungEditCtrl'
                }
            }
        })
        .state('error', {
            url: '/error',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/error/error.html',
                }
            }
        })
        .state('errorNoProduct', {
            url: '/errorNoProduct',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/error/errorNoProduct.html',
                }
            }
        })
        .state('logout',{
        	url: '/logout',
        	views: {
        		'@': {
        			templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/logout/logout.html',
        			controller: 'LogoutCtrl'
        		}
        	}
        })
        .state('briefInfo',{
        	url: '/briefInfo',
        	views: {
        		'@': {
        			templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/reqactions/eakVerknuepfen/briefInfo.html',
        			controller: 'LogoutCtrl'
        		}
        	}
        })
        .state('impressum', {
            url: '/impressum',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/root/impressum.html'
                }
            }
        })
        .state('datenschutz', {
            url: '/datenschutz',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/root/datenschutz.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                '@': {
                    templateUrl: bouncer.baseClientContentUrlWithSlash + 'templates/login/login.html',
                    controller: 'LoginCtlr'
                }
            }
        })
    $urlRouterProvider.otherwise('/home');

};

angular.module('idp')
    .config(States)

