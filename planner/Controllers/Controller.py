

class Controller:
    def __init__(self):
        pass

    @staticmethod
    def navigation_handler(headerModel, receive_data):
        if receive_data["request_type"] == "set_range":
            headerModel.set_start_end_dates(receive_data["data"]["year_start"], receive_data["data"]["year_end"],
                                            receive_data["data"]["week_start"], receive_data["data"]["week_end"])
        elif receive_data["request_type"] == "set_date":
            if receive_data["data"]["input_type"] == "set_week":
                headerModel.set_header_based_on_week_number(receive_data["data"]["week"], receive_data["data"]["year"], 10, 10)
            elif receive_data["data"]["input_type"] == "set_date":
                headerModel.set_header_based_on_date(receive_data["data"]["day"], receive_data["data"]["month"],
                                                     receive_data["data"]["year"])
        elif receive_data["request_type"] == "move":
            headerModel.set_header_based_on_move(receive_data["data"]["direction"], receive_data["data"]["week_start"],
                                                 receive_data["data"]["week_end"], receive_data["data"]["year_start"],
                                                 receive_data["data"]["year_end"])
