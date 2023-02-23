const exclusiveCouponData = {
    "optionLabel": "coupon_type",
    "options": {
        "fullservice": {
            "duration": 7,
            "value": "fullservice",
            "label": "Full Service",
            "image": "full-service.png",
            "countType": "count",
            "optionLabel": "options",
            "details": [
                "60-point safety check",
                "Top up all fluids"
            ],
            "options": {
                "japanese": {
                    "value": "japanese",
                    "label": "Japanese",
                    "optionLabel": "oil_quantity",
                    "options": {
                        "4": {
                            "value": 4,
                            "label": "4 Litres",
                            "price": 60
                        },
                        "6": {
                            "value": 6,
                            "label": "6 Litres",
                            "price": 70
                        },
                        "8": {
                            "value": 8,
                            "label": "8 Litres",
                            "price": 80
                        }
                    },
                    "conditions": [
                        "Japanese cars only",
                        "Extra oil will incur extra charge",
                        "Some Japanese cars require special oil and filters surcharge extra cost",
                        "Nonrefundable",
                        "Conditions may apply"
                    ]
                },
                "european": {
                    "value": "european",
                    "label": "European",
                    "optionLabel": "oil_quantity",
                    "options": {
                        "4": {
                            "value": 4,
                            "label": "4 Litres",
                            "price": 80
                        },
                        "6": {
                            "value": 6,
                            "label": "6 Litres",
                            "price": 100
                        },
                        "8": {
                            "value": 8,
                            "label": "8 Litres",
                            "price": 120
                        }
                    },
                    "conditions": [
                        "European cars only",
                        "Extra oil will incur extra charge",
                        "Some European cars require special oil and filters surcharge extra cost",
                        "Nonrefundable",
                        "Conditions may apply"
                    ]
                }
            }
        },
        "oil": {
            "duration": 7,
            "value": "oil",
            "label": "Oil Service",
            "image": "oil-service.png",
            "countType": "count",
            "optionLabel": "options",
            "details": [],
            "options": {
                "japanese": {
                    "value": "japanese",
                    "label": "Japanese",
                    "optionLabel": "oil_quantity",
                    "options": {
                        "4": {
                            "value": 4,
                            "label": "4 Litres",
                            "price": 40
                        },
                        "6": {
                            "value": 6,
                            "label": "6 Litres",
                            "price": 50
                        },
                        "8": {
                            "value": 8,
                            "label": "8 Litres",
                            "price": 60
                        }
                    },
                    "conditions": [
                        "Japanese cars only",
                        "Extra oil will incur extra charge",
                        "Some Japanese cars require special oil and filters surcharge extra cost",
                        "Nonrefundable",
                        "Conditions may apply"
                    ]
                },
                "european": {
                    "value": "european",
                    "label": "European",
                    "optionLabel": "oil_quantity",
                    "options": {
                        "4": {
                            "value": 4,
                            "label": "4 Litres",
                            "price": 60
                        },
                        "6": {
                            "value": 6,
                            "label": "6 Litres",
                            "price": 80
                        },
                        "8": {
                            "value": 8,
                            "label": "8 Litres",
                            "price": 100
                        }
                    },
                    "conditions": [
                        "European cars only",
                        "Extra oil will incur extra charge",
                        "Some European cars require special oil and filters surcharge extra cost",
                        "Nonrefundable",
                        "Conditions may apply"
                    ]
                }
            }
        },
        "tint": {
            "duration": 3,
            "value": "tint",
            "label": "Window Tint",
            "image": "tint.png",
            "countType": "single",
            "optionLabel": "vehicle_type",
            "options": {
                "normal": {
                    "value": "normal",
                    "label": "Normal cars",
                    "price": 170,
                    "details": [
                        "35% darkness",
                        "includes sedan, hatchback & coupe",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                },
                "suv": {
                    "value": "suv",
                    "label": "SUV",
                    "price": 210,
                    "details": [
                        "35% darkness",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                },
                "ute": {
                    "value": "ute",
                    "label": "UTE",
                    "price": 170,
                    "details": [
                        "35% darkness",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                },
                "hiace_old": {
                    "value": "hiace_old",
                    "label": "Hiace old shape",
                    "price": 250,
                    "details": [
                        "35% darkness front & 5% darkness rear",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                },
                "hiace_new": {
                    "value": "hiace_new",
                    "label": "Hiace new shape",
                    "price": 300,
                    "details": [
                        "35% darkness front & 5% darkness rear",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                },
                "van": {
                    "value": "van",
                    "label": "Van with sliding window or rubber edged windows",
                    "price": 300,
                    "details": [
                        "35% darkness front & 5% darkness rear",
                        "UV CUT - 99%",
                        "Heat Rejection - up to 62%",
                        "Anti Glare - up to 80%",
                        "Anti Scratch"
                    ]
                }
            },
            conditions: [
                "Nonrefundable",
                "extra $30 for older than 2000 model",
                "extra $10/window for darker than 35%",
                "extra $30 for European model",
                "extra $20 for large vehicle",
                "extra $30 ~ $100 for old tints or glue removal",
                "extra charge may apply for some special models"
            ]
        },
        "wof": {
            "duration": 12,
            "value": "wof",
            "label": "WOF",
            "image": "wof.png",
            "countType": "count",
            "price": 20,
            "conditions": [
                "Nonrefundable",
                "Conditions may apply"
            ]
        },
        "mechwarranty": {
            "value": "mechwarranty",
            "label": "Mechanical Warranty",
            "image": "mechanical-warranty.png",
            "countType": "year",
            "price": null,
            "conditions": [
                "Conditions may apply"
            ]
        }
    }
}

export default exclusiveCouponData
